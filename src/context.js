import React, {useState} from "react";
import axios from "./axios";
import { Discovery } from "aws-sdk";

export default function Context() {
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

    return (
        <div>
            {Object.keys(factors).map((item, i) => {
                return (
                    <div key={i}>
                        <input id={item} name='factor' type='checkbox' value={item} onClick={e => formContext(e.target.value)}></input>
                        <label htmlFor={item} >{factors[item]}</label>
                        <br/>
                    </div>
                );
            })}
        </div>
    );
}