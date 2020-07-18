import {ADD_REVIEW_FAILURE, GET_ALL_REVIEWS_SUCCESS, GET_REVIEWS_SUCCESS} from "./actionsTypes";
import axiosApi from "../../axiosApi";

export const getAllReviewsSuccess = reviews => ({type: GET_ALL_REVIEWS_SUCCESS, reviews})

export const getReviewsSuccess = reviews => ({type: GET_REVIEWS_SUCCESS, reviews})

export const addReviewFailure = error => ({type: ADD_REVIEW_FAILURE, error})

export const getAllReviewsRequest = () => async dispatch => {
    try {
        const reviews = await axiosApi.get('/reviews')
        dispatch(getAllReviewsSuccess(reviews.data))
    } catch (e) {
        console.log(e);
    }
}

export const getReviewsRequest = id => async dispatch => {
    try {
        const reviews = await axiosApi.get('/reviews/'+id)
        dispatch(getReviewsSuccess(reviews.data))
    } catch (e) {
        console.log(e);
    }
}

export const addReviewRequest = (review, id) => async dispatch => {
    try {
        await axiosApi.post('/reviews/'+id, review)
    } catch (e) {
        dispatch(addReviewFailure(e))
    }
}

export const deleteReviewRequest = id => async () => {
    try {
        await axiosApi.delete('/reviews/'+id)
    } catch (e) {
        console.log(e);
    }
}