import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Registration extends React.Component {
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
        console.log("testing state", this.state);
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                pass: this.state.pass,
                confpass: this.state.confpass,
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("./app");
                } else if (!data.passconf) {
                    this.setState({
                        passerror: true
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
            <div style={{fontSize: '2rem',border: "none", display: 'flex', flexDirection: 'column',  fontFamily: "sans-serif",
                textAlign: "center"}}>
                {this.state.error && (
                    <div
                        className="error"
                    >
                        Ooops! Something went wrong. Try again 🤒
                    </div>
                )}
                {this.state.passerror && (
                    <div
                        className="error"
                    >
                        Your passwords do not match. We know, it is hard with
                        the ***. Try again 🤒
                    </div>
                )}
                <h1
                    style={{
                        color: "#5C3C02",
                    }}
                >
                    Register
                </h1>
                <br />
                <input
                    name="first"
                    placeholder="first name"
                    onChange={e => this.handleChange(e)}
                    className="input"
                />
                <br />
                <input
                    name="last"
                    placeholder="last name"
                    className="input"
                    onChange={e => this.handleChange(e)}
                    
                />
                <br />
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input"
                    onChange={e => this.handleChange(e)}
                   
                />
                <br />
                <input
                    name="pass"
                    type="password"
                    placeholder="password"
                    className="input"
                    onChange={e => this.handleChange(e)}
                    
                />
                <br />
                <input
                    name="confpass"
                    type="password"
                    className="input"
                    placeholder="confirm password"
                    onChange={e => this.handleChange(e)}
                />
                <br />

                <style type="text/css">
                    .button{`{background: #f5fcef; width: 75vw; height:3rem; font-size: 2rem; }`}
                    .button:hover {`{background: #67912d;}`}
                    .error {`{color: "red";
                            background: "#334431"
                        }`}
                    .input {`{width: 75vw; height:5rem; font-size: 4rem}`}
                </style>
                <button
                    className="button"
                    onClick={e => this.submit(e)}
                >
                    Register
                </button>
                <p>
                    Already registered? <Link to="/Login"> Log in </Link>
                </p>
            </div>
        );
    }
}
