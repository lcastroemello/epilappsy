import React from "react";
import Slider from 'react-rangeslider';
import {updateCrisisDuration} from './reduxComponents/actions';
import {useDispatch, useSelector} from 'react-redux';

export default function Duration() {
    const dispatch = useDispatch();
    // setting the slider
    const duration = useSelector(state => state && state.duration);
    const durationLabels = {
        0: '0',
        30: '30s',
        60: '1m', 
        90: '1m30',
        120: '2m'
    };

    return (
        <div className='slider custom-labels'>
            <Slider
                value={duration}
                labels={durationLabels}
                min={0}
                max={120}
                onChange={e => dispatch(updateCrisisDuration(e))}/>
            <br/>
            <style type="text/css">
                    .rangeslider__label-item {`{font-size: 3rem !important; bottom: 10px !important}`}
            </style>
                
        </div>
    );

}
