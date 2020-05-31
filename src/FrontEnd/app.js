import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import Button from '@material-ui/core/Button';

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
   
 

    const saveCrisisInfo= () => {
        dispatch(saveCrisis(JSON.stringify([type, context, duration])));
    };

    return (
        <BrowserRouter>
            <>
                {addCrisisIsVisible && 
                    <form style={{background: "#f5fcef", margin:0}}>
                        <h1 style={{fontSize: '4rem', textAlign: 'center', color: "#334431",
                            fontFamily: "Lacquer, sans-serif"}} >Enter your crisis info and click on save!</h1>
                        <h2 style={{fontSize: '3rem'}}>1) What type of crisis did you have?</h2>
                        <br/>
                        <Types/>
                        <hr />
                        <h2 style={{fontSize: '4rem'}} >2) What was the context?</h2>
                        <Context/>
                        <hr />
                        <h2 style={{fontSize: '4rem'}} >3)How long did your crisis last?</h2>
                        <Duration/>
                        <hr />
                        <Button
                            variant='contained'
                            className="button"
                            onClick={() => saveCrisisInfo()}
                        >Save this crisis</Button>
                    </form>
                }
                {!addCrisisIsVisible &&
                     <div>
                         <h1 style={{fontSize: '3rem'}} >Your crisis was registered on our system!</h1>
                         <Button
                             variant='contained'
                             className="button"
                             onClick={() => dispatch(addNewCrisis())}
                         >Back to crisis page</Button>
                
                     </div>
                }
            </>
        </BrowserRouter>
    );
}