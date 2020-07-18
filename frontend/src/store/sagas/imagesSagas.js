import axiosApi from '../../axiosApi'
import {put, takeEvery} from "@redux-saga/core/effects";
import {
    ADD_IMAGE_REQUEST, DELETE_IMAGE_REQUEST,
    GET_ALL_IMAGES_REQUEST, GET_IMAGES_REQUEST,
    LOGIN_USER_REQUEST,
    LOGOUT_REQUEST,
    REGISTER_USER_REQUEST
} from "../actions/actionsTypes";
import {loginUserFailure, loginUserSuccess, logoutUserSuccess, registerUserFailure} from "../actions/usersActions";
import {push} from 'connected-react-router'
import {toast} from "react-toastify";
import {toastConfig} from "../../config";
import {addImageFailure, getAllImagesSuccess, getImagesSuccess} from "../actions/imagesActions";

function* getAllImages() {
    try {
        const images = yield axiosApi.get('/images')
        yield put(getAllImagesSuccess(images.data))
    } catch (e) {
        console.log(e);
    }
}

function* getImages({id}) {
    try {
        console.log(2);
        const images = yield axiosApi.get('/images/'+id)
        yield put(getImagesSuccess(images.data))
    } catch (e) {
        console.log(e);
    }
}

function* deleteImage({id}) {
    try {
        yield axiosApi.delete('/images/'+id)
    } catch (e) {
        console.log(e);
    }
}

function* addImage({image, id}) {
    try {
        console.log(1);
        yield axiosApi.post('/images/'+id, image)
    } catch (e) {
        yield put(addImageFailure(e))
    }
}

export default [
    takeEvery(GET_ALL_IMAGES_REQUEST, getAllImages),
    takeEvery(GET_IMAGES_REQUEST, getImages),
    takeEvery(ADD_IMAGE_REQUEST, addImage),
    takeEvery(DELETE_IMAGE_REQUEST, deleteImage),
]