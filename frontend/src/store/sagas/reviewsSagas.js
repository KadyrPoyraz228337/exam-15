import axiosApi from '../../axiosApi'
import {put, takeEvery} from "@redux-saga/core/effects";
import {
    ADD_REVIEW_REQUEST,
    DELETE_REVIEW_REQUEST,
    GET_ALL_REVIEWS_REQUEST, GET_REVIEWS_REQUEST,
    LOGIN_USER_REQUEST,
    LOGOUT_REQUEST,
    REGISTER_USER_REQUEST
} from "../actions/actionsTypes";
import {loginUserFailure, loginUserSuccess, logoutUserSuccess, registerUserFailure} from "../actions/usersActions";
import {push} from 'connected-react-router'
import {toast} from "react-toastify";
import {toastConfig} from "../../config";
import {addReviewFailure, getAllReviewsSuccess, getReviewsSuccess} from "../actions/reviewsActions";

function* getAllReviews() {
    try {
        const reviews = yield axiosApi.get('/reviews')
        yield put(getAllReviewsSuccess(reviews.data))
    } catch (e) {
        console.log(e);
    }
}

function* getReviews({id}) {
    try {
        const reviews = yield axiosApi.get('/reviews/'+id)
        yield put(getReviewsSuccess(reviews.data))
    } catch (e) {
        console.log(e);
    }
}

function* deleteReview({id}) {
    try {
        yield axiosApi.delete('/reviews/'+id)
    } catch (e) {
        console.log(e);
    }
}

function* addReview({review, id}) {
    try {
        yield axiosApi.post('/reviews/'+id, review)
    } catch (e) {
        yield put(addReviewFailure(e))
    }
}

export default [
    takeEvery(GET_ALL_REVIEWS_REQUEST, getAllReviews),
    takeEvery(GET_REVIEWS_REQUEST, getReviews),
    takeEvery(DELETE_REVIEW_REQUEST, deleteReview),
    takeEvery(ADD_REVIEW_REQUEST, addReview),
]