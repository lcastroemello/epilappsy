import React from "react";
import { Link } from "react-router-dom";
import axios from "../../structure/axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    const {register, handleSubmit} = useForm();
    const onSubmit= formData => {
        axios
        .post("/login", {
            email: formData.email,
            pass: formData.password
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
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
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
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h1 style={{ color: "#5C3C02"}} > Login </h1>
                    <input id='email' label='Email' name='email' variant='outlined' onChange={e => this.handleChange(e)} />
                    <br />
                    <input id='password' type='Password' name='password' label='Password' variant='outlined' onChange={e => this.handleChange(e)} />
                    <br />
                    <input type='submit' >Login</input>
                </form>
                <style type="text/css">
                    .error {`{color: "red";
                            background: "#334431"
                        }`}
                    .input {`{width: 75vw; height:5rem; font-size: 4rem}`}
                </style>
                <p>
                    Not registered yet? <Link to="/"> Register </Link>
                </p>
            </div>
        );
    }
}
