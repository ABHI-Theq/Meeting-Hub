export const ADD_PEER = 'ADD_PEER';
export const REMOVE_PEER = 'REMOVE_PEER';
export const ADD_SCREEN_SHARE = 'ADD_SCREEN_SHARE';
export const REMOVE_SCREEN_SHARE = 'REMOVE_SCREEN_SHARE';

export const addPeerAction=(peerId:string,stream:MediaStream)=>({
    type: ADD_PEER,
    payload: {
        peerId,
        stream
}
})

export const removePeerAction=(peerId: string)=>({
    type: REMOVE_PEER,
    payload: {
        peerId
    }
})

export const addScreenShareAction=(peerId:string,stream:MediaStream)=>({
    type: ADD_SCREEN_SHARE,
    payload: {
        peerId,
        stream
    }
})

export const removeScreenShareAction=(peerId: string)=>({
    type: REMOVE_SCREEN_SHARE,
    payload: {
        peerId
    }
})