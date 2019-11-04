import React, {useState} from "react";
import axios from "./axios";
import Slider from 'react-rangeslider';

export default function Duration() {
    // setting the slider
    const [vertical, setVertical] = useState(60);
    const verticalLabels = {
        0: '0',
        30: '30sec',
        60: '1min', 
        90: '1min30',
        120: '2min'
    };

    return (
        <div className='slider custom-labels'>
            <Slider
                value={vertical}
                orientation='vertical'
                labels={verticalLabels}
                min={0}
                max={120}
                onChange={e => setVertical(e)}/>
        </div>
    );

}