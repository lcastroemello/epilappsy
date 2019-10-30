import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                pass: this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("./");
                } else if (data.usernoexist) {
                    this.setState({
                        noemail: true
                    });
                } else if (data.passfalse) {
                    this.setState({
                        noemail: true
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div style={{fontSize: '2rem',border: "none", display: 'flex', flexDirection:'column', textAlign:'center'}}>
                {this.state.error && (
                    <div
                        className="error"
                    >
                        Ooops! Something went wrong. Are you sure you are
                        already registered? Try again 🤒
                    </div>
                )}
                {this.state.noemail && (
                    <div
                        className="error"
                    >
                        Check your email and password and
                        try again 🤒
                    </div>
                )}
                <h1
                    style={{
                        color: "#5C3C02",
                        fontFamily: "sans-serif",
                        textAlign: "center"
                    }}
                >
                    Log in
                </h1>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input"
                    onChange={e => this.handleChange(e)}
                />
                <br/>
                <input
                    name="pass"
                    type="password"
                    className="input"
                    placeholder="password"
                    onChange={e => this.handleChange(e)}
                />
                <br/>
                <style type="text/css">
                    .button{`{background: #f5fcef; width: 75vw; height:3rem; font-size: 2rem; }`}
                    .button:hover {`{background: #67912d;}`}
                    .error {`{color: "red";
                            background: "#334431"
                        }`}
                    .input {`{width: 75vw; height:2rem; font-size: 2rem}`}
                </style>
                <button className="button" onClick={e => this.submit(e)}>
                    Log in
                </button>
                <p>
                    Not registered yet? <Link to="/"> Register </Link>
                </p>
            </div>
        );
    }
}
