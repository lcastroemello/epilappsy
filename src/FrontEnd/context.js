import React from "react";
import {updateCrisisContext} from './reduxComponents/actions';
import {useDispatch, useSelector} from 'react-redux';

export default function Context() {
    const dispatch = useDispatch();
    // defining the context
    const factors = {
        'eat': "Didn't eat enough", 
        'sleep': "Poor sleeping",
        'meds': "Forgot to take medications / late",
        'stress': "Under extra-stress", 
        'period': "Have my period", 
        'tired': "Extra tired"
    };
    const context = useSelector(state=> state && state.context); 

    const formContext = e => {
        if (context.indexOf(e) >= 0) {
            // value already exists and it's being unclicked
            let index = context.indexOf(e);
            if (index > -1) {
                context.splice(index, 1);
            }
            dispatch(updateCrisisContext(context));
        } else {
            // value is being clicked for the first time
            context.push(e);
            dispatch(updateCrisisContext(context));
        }
    };

    return (
        <div>
            {Object.keys(factors).map((item, i) => {
                return (
                    <div style={{fontSize: '3rem'}} key={i}>
                        <input id={item} name='factor' type='checkbox' value={item} onClick={e => formContext(e.target.value)}></input>
                        <label htmlFor={item} >{factors[item]}</label>
                        <br/>
                    </div>
                );
            })}
        </div>
    );
}