const spicedPg = require("spiced-pg");
let db;

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/epilappsy";

db = spicedPg(dbUrl);
// }

//--------GETTING INFO from users--------------

exports.getUserByEmail = function getUserbyEmail(email) {
    return db.query("SELECT * FROM users WHERE email=$1", [email]);
};

//-------ADDING info to users-------------

exports.addUser = function addUser(
    first_name,
    last_name,
    email,
    password,
) {
    console.log("db addSignature works");
    return db.query(
        "INSERT INTO users (first, last, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING id",
        [first_name, last_name, email, password]
    );
};

// ------ADDING CRISIS into CRISIS -----------------
exports.addCrisis = function addCrisis(
    user_id, type, duration_sec, eat, sleep, meds, stress, periodTime, tired, other
) {
    return db.query("INSERT INTO crisis (user_id, type, duration_sec, eat, sleep, meds, stress, period, tired, other) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING created_at", [user_id, type, duration_sec, eat, sleep, meds, stress, periodTime, tired, other]);
};


