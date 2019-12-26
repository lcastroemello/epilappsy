const express = require("express");
const app = express();
const compression = require("compression");
const ca = require("chalk-animation");
const bcrypt = require("bcryptjs");
const db = require("./sql/db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const moment = require("moment");
const server = require("http").Server(app);

app.use(express.static("./static"));
let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}
const cookieSessionMiddleware = cookieSession({
    secret: secrets.cookiesecret,
    maxAge: 1000 * 60 * 60 * 24 * 14
});
app.use(cookieSessionMiddleware);
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(compression());

//-------------------FormData API----------------------

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//--------------------BUNDLE.JS-------------------------

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//---------------BCRYPT functions-----------------
function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
}

// ------------------REGISTERING NEW USERS-------------------

app.post("/register", function(req, res) {

    const {
        first,
        last,
        email,
        pass,
        confpass
    } = req.body;
    if (pass === confpass) {
        hashPassword(pass)
            .then(hash => {
                return db.addUser(first, last, email, hash);
            })
            .then(data => {
                req.session.userId = data.rows[0].id;
                console.log(data.rows[0].id);
                res.json({ success: true });
            })
            .catch(err => {
                console.log("register post err", err);
                res.json({ success: false });
            });
    } else {
        res.json({ passconf: false });
    }
});

//-------------------USER LOGIN-----------------------------
app.post("/login", function(req, res) {

    db.getUserByEmail(req.body.email)
        .then(info => {
            if (info.rows.length > 0) {
                checkPassword(req.body.pass, info.rows[0].password_digest).then(
                    boolean => {
                        if (!boolean) {
                            res.json({ passfalse: true });
                        } else {
                            req.session.userId = info.rows[0].id;
                            res.json({ success: true });
                        }
                    }
                );
            } else {
                res.json({ usernoexist: true });
            }
        })
        .catch(err => {
            console.log("login post err", err);
            res.json({ success: false });
        });
});

// --------------------------SAVING NEW CRISIS------------

app.post("/saveCrisis/:crisisInfo", async function(req, res){
    const user_id = req.session.userId;
    const type = JSON.parse(req.params.crisisInfo)[0];
    const duration = JSON.parse(req.params.crisisInfo)[2];
    const context = JSON.parse(req.params.crisisInfo)[1];
    const eat = context.includes('eat') ? true : false;
    const sleep = context.includes('sleep') ? true : false;
    const meds = context.includes('meds') ? true : false;
    const stress = context.includes('stress') ? true : false;
    const periodTime = context.includes('period') ? true : false;
    const tired = context.includes('tired') ? true : false;
    const other = false; 

    try {
        const created_at = await db.addCrisis(user_id, type, duration, eat, sleep, meds, stress, periodTime, tired, other);
        let timetag = moment(
            created_at.rows[0].created_at,
            moment.ISO_8601
        ).format("DD.MMM.YYYY, HH:mm");
        console.log("Crisis stored at", timetag);
        res.json({created_at: timetag});
    } catch (err) {
        console.log('error in saving crisis', err);
    }
    
});

// -----------------------RENDERING WELCOME (KEEP IT IN THE END)-----------------

app.get("*", function(req, res) {
    if (!req.session.userId && req.url != "/reception") {
        res.redirect("/reception");
    } else if (req.session.userId && req.url == "/reception") {
        res.redirect("/app");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// ------------------STARTING OUR SERVER ------------------

server.listen(process.env.PORT || 8080, function() {
    ca.neon("Flashing (but not so fast)!");
});
