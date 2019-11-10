import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Route, BrowserRouter, Link } from "react-router-dom";

import {saveCrisis, addNewCrisis} from './actions';

import Types from './types';
import Context from './context';
import Duration from './duration';

export default function App()  { 
    const dispatch = useDispatch();
    const addCrisisIsVisible = useSelector(state => state && state.addCrisisIsVisible);
    const type = useSelector(state=> state && state.type);
    const context = useSelector(state=> state && state.context);
    const duration = useSelector(state=> state && state.duration);
    const created_at = useSelector(state => state && state.created_at);
 

    const saveCrisisInfo= () => {
        dispatch(saveCrisis(JSON.stringify([type, context, duration])));
    };

    return (
        <BrowserRouter>
            <div>
                {addCrisisIsVisible && 
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
                        onClick={() => saveCrisisInfo()}
                    >Save this crisis</button>
                </div>
                }
                {!addCrisisIsVisible &&
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
                    onClick={() => dispatch(addNewCrisis())}
                >Back to crisis page</button>
                
            </div>
                }
 
            </div>
        </BrowserRouter>
    );
}