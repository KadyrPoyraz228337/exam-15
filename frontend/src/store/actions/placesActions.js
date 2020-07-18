import {ADD_PLACE_FAILURE, GET_PLACE_SUCCESS, GET_PLACES_SUCCESS, PLACE_INIT} from "./actionsTypes";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router'

export const getPlacesSuccess = places => ({type: GET_PLACES_SUCCESS, places})

export const getPlaceSuccess = place => ({type: GET_PLACE_SUCCESS, place})

export const addPlaceFailure = error => ({type: ADD_PLACE_FAILURE, error})

export const placeInit = () => ({type: PLACE_INIT})


export const getPlaceRequest = id => async dispatch => {
    try {
        const places = await axiosApi.get('/places/'+id)
        dispatch(getPlaceSuccess(places.data))
    } catch (e) {
        console.log(e);
    }
}

export const getPlacesRequest = () => async dispatch => {
    try {
        const places = await axiosApi.get('/places')
        dispatch(getPlacesSuccess(places.data))
    } catch (e) {
        console.log(e);
    }
}

export const addPlaceRequest = place => async dispatch => {
    try {
        await axiosApi.post('/places', place)
        dispatch(push('/'))
    } catch (e) {
        dispatch(addPlaceFailure(e))
    }
}

export const deletePlaceRequest = place => async () => {
    try {
        await axiosApi.delete('/places/'+place)
    } catch (e) {
        console.log(e);
    }
}