import {ADD_IMAGE_FAILURE, GET_ALL_IMAGES_SUCCESS, GET_IMAGES_SUCCESS} from "../actions/actionsTypes";

const INITIAL_STATE = {
    images: null,
    allImages: null,
    error: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_IMAGES_SUCCESS:
            return {...state, allImages: action.images}
        case GET_IMAGES_SUCCESS:
            return {...state, images: action.images}
        case ADD_IMAGE_FAILURE:
            return {...state, error: action.error.response.data}
        default: return state
    }
}