import {ADD_REVIEW_FAILURE, GET_ALL_REVIEWS_SUCCESS, GET_REVIEWS_SUCCESS} from "../actions/actionsTypes";

const INITIAL_STATE = {
    reviews: null,
    allReviews: null,
    error: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_REVIEWS_SUCCESS:
            return {...state, allReviews: action.reviews}
        case GET_REVIEWS_SUCCESS:
            return {...state, reviews: action.reviews}
        case ADD_REVIEW_FAILURE:
            return {...state, error: action.error.response.data}
        default: return state
    }
}