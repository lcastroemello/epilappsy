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
    const timetag = await axios.post('saveCrisis/' + crisisInfo);
    console.log('timetag in action', timetag);
    return {
        type: 'SAVE_CRISIS', 
        created_at: timetag
    };
}

export function addNewCrisis() {
    return {
        type: 'ADD_NEW_CRISIS'
    };
}

