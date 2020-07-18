import {ADD_REVIEW_FAILURE, ADD_REVIEW_REQUEST, GET_REVIEWS_REQUEST} from "./actionsTypes";

export const getReviewsRequest = id => ({type: GET_REVIEWS_REQUEST, id})

export const addReviewRequest = review => ({type: ADD_REVIEW_REQUEST, review})
export const addReviewFailure = error => ({type: ADD_REVIEW_FAILURE, error})