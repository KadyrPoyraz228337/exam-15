import {ADD_PLACE_FAILURE, GET_PLACES_SUCCESS, PLACE_INIT} from "../actions/actionsTypes";

const INITIAL_STATE = {
    places: null,
    error: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PLACES_SUCCESS:
            return {...state, places: action.places}
        case ADD_PLACE_FAILURE:
            return {...state, error: action.error.response.data}
        case PLACE_INIT:
            return {...state, error: null}
        default: return state
    }
}