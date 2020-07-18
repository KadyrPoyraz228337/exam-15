import {
    ADD_REVIEW_FAILURE,
    ADD_REVIEW_REQUEST, DELETE_REVIEW_REQUEST,
    GET_ALL_REVIEWS_REQUEST, GET_ALL_REVIEWS_SUCCESS,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS
} from "./actionsTypes";

export const getAllReviewsRequest = () => ({type: GET_ALL_REVIEWS_REQUEST})
export const getAllReviewsSuccess = reviews => ({type: GET_ALL_REVIEWS_SUCCESS, reviews})

export const getReviewsRequest = id => ({type: GET_REVIEWS_REQUEST, id})
export const getReviewsSuccess = reviews => ({type: GET_REVIEWS_SUCCESS, reviews})

export const addReviewRequest = (review, id) => ({type: ADD_REVIEW_REQUEST, review, id})
export const addReviewFailure = error => ({type: ADD_REVIEW_FAILURE, error})

export const deleteReviewRequest = id => ({type: DELETE_REVIEW_REQUEST, id})