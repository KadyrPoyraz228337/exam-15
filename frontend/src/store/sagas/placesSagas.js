import axiosApi from '../../axiosApi'
import {put, takeEvery} from "@redux-saga/core/effects";
import {
    ADD_PLACE_REQUEST, DELETE_PLACE_REQUEST,
    GET_PLACES_REQUEST,
    GET_PLACES_SUCCESS,
    LOGIN_USER_REQUEST,
    LOGOUT_REQUEST,
    REGISTER_USER_REQUEST
} from "../actions/actionsTypes";
import {loginUserFailure, loginUserSuccess, logoutUserSuccess, registerUserFailure} from "../actions/usersActions";
import {push} from 'connected-react-router'
import {toast} from "react-toastify";
import {toastConfig} from "../../config";
import {addPlaceFailure, getPlacesSuccess} from "../actions/placesActions";

function* getPlaces() {
    try {
        const places = yield axiosApi.get('/places')
        yield put(getPlacesSuccess(places.data))
    } catch (e) {
        console.log(e);
    }
}

function* addPlace({place}) {
    try {
        yield axiosApi.post('/places', place)
        yield put(push('/'))
    } catch (e) {
        yield put(addPlaceFailure(e))
    }
}

function* deletePlace({place}) {
    try {
        yield axiosApi.delete('/places/'+place)
    } catch (e) {
        console.log(e);
    }
}

export default [
    takeEvery(GET_PLACES_REQUEST, getPlaces),
    takeEvery(ADD_PLACE_REQUEST, addPlace),
    takeEvery(DELETE_PLACE_REQUEST, deletePlace),
]