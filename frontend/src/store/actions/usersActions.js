import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_INIT,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_INIT
} from "./actionsTypes";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router'
import {toast} from "react-toastify";
import {toastConfig} from "../../config";

export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error})
export const registerUserInit = () => ({type: REGISTER_USER_INIT})

export const loginUserSuccess = userData => ({type: LOGIN_USER_SUCCESS, userData})
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error})
export const loginUserInit = () => ({type: LOGIN_USER_INIT})

export const logoutUserSuccess = () => ({type: LOGOUT_USER})

export const registerUserRequest = userData => async dispatch => {
    try {
        await axiosApi.post('/users', userData)
        dispatch(push('/'))
        toast.info('🦄Register successful!', toastConfig);
    } catch (e) {
        dispatch(registerUserFailure(e))
    }
}

export const loginUserRequest = userData => async dispatch => {
    try {
        const resp = await axiosApi.post('/users/sessions', userData)
        dispatch(loginUserSuccess(resp.data))
        dispatch(push('/'))
        toast.info('🦄Login successful!', toastConfig);
    } catch (e) {
        dispatch(loginUserFailure(e))
    }
}

export const logoutUserRequest = () => async dispatch => {
    try {
        await axiosApi.delete('/users/sessions')
        dispatch(push('/login'))
        dispatch(logoutUserSuccess())
        toast.info('🦄Logout successful!', toastConfig);
    } catch (e) {
        dispatch(logoutUserSuccess())
    }
}