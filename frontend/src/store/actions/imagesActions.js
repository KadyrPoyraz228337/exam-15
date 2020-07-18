import {ADD_IMAGE_FAILURE, GET_ALL_IMAGES_SUCCESS, GET_IMAGES_SUCCESS} from "./actionsTypes";
import axiosApi from "../../axiosApi";

export const getAllImagesSuccess = images => ({type: GET_ALL_IMAGES_SUCCESS, images})

export const getImagesSuccess = images => ({type: GET_IMAGES_SUCCESS, images})

export const addImageFailure = error => ({type: ADD_IMAGE_FAILURE, error})

export const getAllImagesRequest = () => async dispatch => {
    try {
        const images = await axiosApi.get('/images')
        dispatch(getAllImagesSuccess(images.data))
    } catch (e) {
        console.log(e);
    }
}

export const getImagesRequest = id => async dispatch => {
    try {
        const images = await axiosApi.get('/images/'+id)
        dispatch(getImagesSuccess(images.data))
    } catch (e) {
        console.log(e);
    }
}

export const addImageRequest = (image, id) => async dispatch => {
    try {
        await axiosApi.post('/images/'+id, image)
    } catch (e) {
        dispatch(addImageFailure(e))
    }
}

export const deleteImageRequest = id => async () => {
    try {
        console.log('1 delete');
        await axiosApi.delete('/images/'+id)
        console.log('2 delete');
    } catch (e) {
        console.log(e);
    }
}