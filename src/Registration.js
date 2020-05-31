import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
            <div style={{fontSize: '2rem', display: 'flex', flexDirection: 'column',  fontFamily: "sans-serif",
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
                <style type="text/css">
                    .error {`{color: "red";
                            background: "#334431"
                        }`}
<<<<<<< HEAD
                    .input {`{width: 75vw; height:5rem; font-size: 4rem}`}
=======
>>>>>>> c50ee91d8cc431688ea58e45585e4b7fe03e597a
                </style>
                <form noValidate autoComplete='off' >
                <h1 style={{ color: "#5C3C02"}} > Register </h1>
                <TextField id='firstName' label='First Name'  variant='outlined' onChange={e => this.handleChange(e)} />
                <br />
                <TextField id='lastName' label='Last Name'  variant='outlined' onChange={e => this.handleChange(e)} />
                <br />
                <TextField id='email' label='Email' variant='outlined' onChange={e => this.handleChange(e)} />
                <br />
                <TextField id='password' type='Password' label='Password' variant='outlined' onChange={e => this.handleChange(e)} />
                <br />
                <TextField id='passwordConfirmation' type='password' label='Password Confirmation' variant='outlined' onChange={e => this.handleChange(e)} />
                <br />
                <Button variant='contained' color='primary' className="button" onClick={e => this.submit(e)} >Register</Button>
                 </form>
                <p>
                    Already registered? <Link to="/Login"> Log in </Link>
                </p>
            </div>
        );
    }
}
