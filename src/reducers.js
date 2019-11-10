export default function reducer(state = {
    addCrisisIsVisible: true,
    context:[]
}, action) {
    if(action.type == 'UPDATE_TYPE') {
        console.log('type updated', action.crisisType );
        state = {...state, type: action.crisisType};
    }
    if(action.type == 'UPDATE_CONTEXT') {
        console.log('context updated', action.crisisContext);
        state= {
            ...state,
            context: action.crisisContext
        };
    }
    if (action.type == 'UPDATE_DURATION') {
        console.log('duration updated',action.crisisDuration );
        state = {
            ...state,
            duration: action.crisisDuration
        };
    }
    if (action.type == 'SAVE_CRISIS') {
        state = {
            ...state,
            addCrisisIsVisible: false
        };
    }
    if (action.type == 'ADD_NEW_CRISIS') {
        state = {
            ...state,
            addCrisisIsVisible: true
        };
    }


    return state;
}