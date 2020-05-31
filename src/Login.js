import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
                 <form noValidate autoComplete='off' >
                <h1 style={{ color: "#5C3C02"}} > Login </h1>
                <TextField id='email' label='Email' variant='outlined' onChange={e => this.handleChange(e)} />
                <br />
                <TextField id='password' type='Password' label='Password' variant='outlined' onChange={e => this.handleChange(e)} />
                <br />
                <Button variant='contained' color='primary' className="button" onClick={e => this.submit(e)} >Login</Button>
                 </form>
                <style type="text/css">
                    .error {`{color: "red";
                            background: "#334431"
                        }`}
<<<<<<< HEAD
                    .input {`{width: 75vw; height:5rem; font-size: 4rem}`}
=======
>>>>>>> c50ee91d8cc431688ea58e45585e4b7fe03e597a
                </style>
                <p>
                    Not registered yet? <Link to="/"> Register </Link>
                </p>
            </div>
        );
    }
}
