import axios from "./axios";

export function updateCrisisType(crisisType) {
    return {
        type: 'UPDATE_TYPE', 
        crisisType: crisisType
    };
}

export function updateCrisisContext(crisisContext){
    return {
        type: 'UPDATE_CONTEXT',
        crisisContext: crisisContext
    };
}

export function updateCrisisDuration(crisisDuration) {
    return {
        type: 'UPDATE_DURATION',
        crisisDuration: crisisDuration
    };
}

export async function saveCrisis(crisisInfo) {
    await axios.post('saveCrisis/' + crisisInfo);
    console.log('this is the info', crisisInfo);
    return {
        type: 'SAVE_CRISIS'
    };
}

export function addNewCrisis() {
    return {
        type: 'ADD_NEW_CRISIS'
    };
}

