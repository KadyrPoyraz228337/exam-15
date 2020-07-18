import {
    ADD_PLACE_FAILURE,
    ADD_PLACE_REQUEST,
    DELETE_PLACE_REQUEST,
    GET_PLACES_REQUEST,
    GET_PLACES_SUCCESS, PLACE_INIT
} from "./actionsTypes";

export const getPlacesRequest = () => ({type: GET_PLACES_REQUEST})
export const getPlacesSuccess = places => ({type: GET_PLACES_SUCCESS, places})

export const addPlaceRequest = place => ({type: ADD_PLACE_REQUEST, place})
export const addPlaceFailure = error => ({type: ADD_PLACE_FAILURE, error})

export const deletePlaceRequest = place => ({type: DELETE_PLACE_REQUEST, place})

export const placeInit = () => ({type: PLACE_INIT})