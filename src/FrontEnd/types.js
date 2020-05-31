import React from "react";
import { useDispatch} from "react-redux";
import {updateCrisisType} from './actions';


export default function Types() {
    const dispatch = useDispatch();
    // defining the crises types
    const types = {
        'fallU': 'Fall down (unconscious)', 
        'sitting': "Body doesn't answer (sitting)", 
        'standing': "Body doesn't answer (standing/not stable)", 
        'fallC': "Body doesn't answer (fall down / conscious)"
    };
    return (
        <div>
            {Object.keys(types).map((item, i) => {
                return (
                    <div key={i} style={{fontSize: '3rem'}}>
                        <input id={item} name='Type' type='radio' value={item} onClick={e => dispatch(updateCrisisType(e.target.value))}></input>
                        <label htmlFor={item} >{types[item]}</label>
                        <br/>
                    </div>
                );
            })}
        </div>
    );
     
}