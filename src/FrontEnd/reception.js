import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Registration from "./users/registration";
import Login from "./users/login";

export default function Reception() {
    return (
        <HashRouter>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#f5fcef",
                    height: "100vh",
                    width: "100vw",
                    backgroundSize: "cover"
                }}
            >
                <div>
                    <h1
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: "#2b570d",
                            fontFamily: "Lacquer, sans-serif",
                            fontSize: "5rem",
                            padding: '5rem',
                            textAlign: "center",
                            filter: "drop-shadow(-20px 20px 30px #f5fcef)"
                        }}
                    >
                        Welcome to <br /> Epilappsy!
                    </h1>
                    <h2
                        style={{
                            flexDirection: 'column',
                            display: 'flex',
                            color: "#334431",
                            fontFamily: "Lacquer, sans-serif",
                            fontSize: "3rem",
                            textAlign: 'center'
                        }}
                    >
                    👩‍⚕️Control your crisis in <br/> three easy steps👨‍⚕️
                    </h2>
                </div>
                <div
                    style={{
                        width: "100vw",
                        display: "flex",
                        flexDirection: 'column',
                        justifySelf: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyItems: "center",
                        background: "#67912d"
                    }}
                >
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </div>
        </HashRouter>
    );
}
