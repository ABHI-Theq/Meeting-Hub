import { ADD_PEER, REMOVE_PEER, ADD_SCREEN_SHARE, REMOVE_SCREEN_SHARE } from "../Actions/peerAction";

type PeerAction={
    type: typeof ADD_PEER | typeof REMOVE_PEER | typeof ADD_SCREEN_SHARE | typeof REMOVE_SCREEN_SHARE;
    payload:{
        peerId: string;
        stream?: MediaStream; // Optional for REMOVE_PEER
    }
}

export const peerReducer=(state: Record<string,MediaStream>,action: PeerAction): Record<string, MediaStream> => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: action.payload.stream as MediaStream
            };
        case REMOVE_PEER:
            const newState = { ...state };
            delete newState[action.payload.peerId];
            return newState;
        default:
            return state;
    }
}

export const screenShareReducer=(state: Record<string,MediaStream>,action: PeerAction): Record<string, MediaStream> => {
    switch (action.type) {
        case ADD_SCREEN_SHARE:
            return {
                ...state,
                [action.payload.peerId]: action.payload.stream as MediaStream
            };
        case REMOVE_SCREEN_SHARE:
            const newState = { ...state };
            delete newState[action.payload.peerId];
            return newState;
        default:
            return state;
    }
}