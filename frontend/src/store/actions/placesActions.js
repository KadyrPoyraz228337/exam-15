import {
    ADD_PLACE_FAILURE,
    ADD_PLACE_REQUEST,
    DELETE_PLACE_REQUEST, GET_PLACE_REQUEST, GET_PLACE_SUCCESS,
    GET_PLACES_REQUEST,
    GET_PLACES_SUCCESS, PLACE_INIT
} from "./actionsTypes";

export const getPlacesRequest = () => ({type: GET_PLACES_REQUEST})
export const getPlacesSuccess = places => ({type: GET_PLACES_SUCCESS, places})

export const getPlaceRequest = id => ({type: GET_PLACE_REQUEST, id})
export const getPlaceSuccess = place => ({type: GET_PLACE_SUCCESS, place})

export const addPlaceRequest = place => ({type: ADD_PLACE_REQUEST, place})
export const addPlaceFailure = error => ({type: ADD_PLACE_FAILURE, error})

export const deletePlaceRequest = place => ({type: DELETE_PLACE_REQUEST, place})

export const placeInit = () => ({type: PLACE_INIT})