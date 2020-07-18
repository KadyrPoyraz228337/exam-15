import axiosApi from '../../axiosApi'
import {put, takeEvery} from "@redux-saga/core/effects";
import {ADD_PLACE_REQUEST, DELETE_PLACE_REQUEST, GET_PLACE_REQUEST, GET_PLACES_REQUEST} from "../actions/actionsTypes";
import {push} from 'connected-react-router'
import {addPlaceFailure, getPlacesSuccess, getPlaceSuccess} from "../actions/placesActions";

function* getPlaces() {
    try {
        const places = yield axiosApi.get('/places')
        yield put(getPlacesSuccess(places.data))
    } catch (e) {
        console.log(e);
    }
}

function* getPlace({id}) {
    try {
        const places = yield axiosApi.get('/places/'+id)
        yield put(getPlaceSuccess(places.data))
        yield put(push('/places/'+id))
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
    takeEvery(GET_PLACE_REQUEST, getPlace),
]