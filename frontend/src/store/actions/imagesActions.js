import {ADD_IMAGE_REQUEST, DELETE_IMAGE_REQUEST, GET_IMAGES_REQUEST} from "./actionsTypes";

export const getImagesRequest = id => ({type: GET_IMAGES_REQUEST, id})

export const addImageRequest = (image, id) => ({type: ADD_IMAGE_REQUEST, image, id})

export const deleteImageRequest = id => ({type: DELETE_IMAGE_REQUEST, id})