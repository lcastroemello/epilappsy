import React, {useState} from "react";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Slider from 'react-rangeslider';


export default function App()  { 
    // defining the crises types
    const [type, setType] = useState();
    const types = {
        'fallU': 'Fall down (unconscious)', 
        'sitting': "Body doesn't answer (sitting)", 
        'standing': "Body doesn't answer (standing/not stable)", 
        'fallC': "Body doesn't answer (fall down / conscious)"
    };
    // defining the context
    const [context, setContext] = useState([]);
    const factors = {
        'eat': "Didn't eat enough", 
        'sleep': "Poor sleeping",
        'meds': "Forgot to take medications / late",
        'stress': "Under extra-stress", 
        'period': "Have my period", 
        'tired': "Extra tired"
    };
    const formContext = e => {
        if (context.indexOf(e) >= 0) {
            // value already exists and it's being unclicked
            let index = context.indexOf(e);
            if (index > -1) {
                context.splice(index, 1);
            }
            setContext(context);
        } else {
            // value is being clicked for the first time
            context.push(e);
            setContext(context);
        }
    };
    // setting the slider
    const [vertical, setVertical] = useState(60);
    const verticalLabels = {
        0: '0',
        30: '30sec',
        60: '1min', 
        90: '1min30',
        120: '2min'
    };
    // submitting methods
    const sendDataToDB = () => {
        console.log('type', type, 'context', context, 'vertical', vertical);
    };

    return (
        <div>
            <h1>Enter your crisis info and click on save!</h1>
            <h2>1) What type of crisis did you have?</h2>
            <br/>
            {Object.keys(types).map((item, i) => {
                return (
                    <div key={i}>
                        <input id={item} name='Type' type='radio' value={item} onClick={e => setType(e.target.value)}></input>
                        <label htmlFor={item} >{types[item]}</label>
                        <br/>
                    </div>
                );
            })}
            <hr />
            <h2>2) What was the context?</h2>
            {Object.keys(factors).map((item, i) => {
                return (
                    <div key={i}>
                        <input id={item} name='factor' type='checkbox' value={item} onClick={e => formContext(e.target.value)}></input>
                        <label htmlFor={item} >{factors[item]}</label>
                        <br/>
                    </div>
                );
            })}
            <hr />
            <h2>3)How long did your crisis last?</h2>
            <div className='slider custom-labels'>
                <Slider
                    value={vertical}
                    orientation='vertical'
                    labels={verticalLabels}
                    min={0}
                    max={120}
                    onChange={e => setVertical(e)}/>
            </div>
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
    );
}