import React, {useState} from "react";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";

import Types from './types';
import Context from './context';
import Duration from './duration';

export default function App()  { 
    const [button, setButton] = useState(false);

    return (
        <div>
            {!button && 
                <div>
                    <h1>Enter your crisis info and click on save!</h1>
                    <h2>1) What type of crisis did you have?</h2>
                    <br/>
                    <Types/>
                    <hr />
                    <h2>2) What was the context?</h2>
                    <Context/>
                    <hr />
                    <h2>3)How long did your crisis last?</h2>
                    <Duration/>
                    <hr />
                    <button
                        style = {{ color: 'white',
                            backgroundColor: '#3f87a6',
                            fontSize: '1rem',
                            margin: 'none',
                            padding: '0.5rem',
                            fontWeight: 'bold'}}
                        className="button"
                        onClick={() => sendDataToDB()}
                    >Save this crisis</button>
                </div>
            }
            {button &&
            <div>
                <h1>Your crisis was registered on our system!</h1>
                <button
                    style = {{ color: 'white',
                        backgroundColor: '#3f87a6',
                        fontSize: '1rem',
                        margin: 'none',
                        padding: '0.5rem',
                        fontWeight: 'bold'}}
                    className="button"
                    onClick={() => sendDataToDB()}
                >Back to crisis page</button>
                
            </div>
            }
 
        </div>
    );
}