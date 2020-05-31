import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";


import Reception from "./reception";
import App from "./app";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname == "/reception") {
// they are logged out
    elem = <Reception />;
} else {
//they are logged in
    elem =  (
        <Provider store={store}> 
            <App />
        </Provider>
   
    );
}

ReactDOM.render(elem, document.querySelector("main"));
