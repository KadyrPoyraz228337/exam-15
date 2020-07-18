import {
    ADD_IMAGE_FAILURE,
    ADD_IMAGE_REQUEST,
    DELETE_IMAGE_REQUEST,
    GET_ALL_IMAGES_REQUEST, GET_ALL_IMAGES_SUCCESS,
    GET_IMAGES_REQUEST,
    GET_IMAGES_SUCCESS
} from "./actionsTypes";

export const getAllImagesRequest = () => ({type: GET_ALL_IMAGES_REQUEST})
export const getAllImagesSuccess = images => ({type: GET_ALL_IMAGES_SUCCESS, images})

export const getImagesRequest = id => ({type: GET_IMAGES_REQUEST, id})
export const getImagesSuccess = images => ({type: GET_IMAGES_SUCCESS, images})

export const addImageRequest = (image, id) => ({type: ADD_IMAGE_REQUEST, image, id})
export const addImageFailure = error => ({type: ADD_IMAGE_FAILURE, error})

export const deleteImageRequest = id => ({type: DELETE_IMAGE_REQUEST, id})