import React from "react";
import Slider from 'react-rangeslider';
import {updateCrisisDuration} from './actions';
import {useDispatch, useSelector} from 'react-redux';

export default function Duration() {
    const dispatch = useDispatch();
    // setting the slider
    const duration = useSelector(state => state && state.duration);
    const durationLabels = {
        0: '0',
        30: '30sec',
        60: '1min', 
        90: '1min30',
        120: '2min'
    };

    return (
        <div className='slider custom-labels'>
            <Slider
                value={duration}
                orientation='vertical'
                labels={durationLabels}
                min={0}
                max={120}
                onChange={e => dispatch(updateCrisisDuration(e))}/>
        </div>
    );

}