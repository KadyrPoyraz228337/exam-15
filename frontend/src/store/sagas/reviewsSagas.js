import axiosApi from '../../axiosApi'
import {put, takeEvery} from "@redux-saga/core/effects";
import {LOGIN_USER_REQUEST, LOGOUT_REQUEST, REGISTER_USER_REQUEST} from "../actions/actionsTypes";
import {loginUserFailure, loginUserSuccess, logoutUserSuccess, registerUserFailure} from "../actions/usersActions";
import {push} from 'connected-react-router'
import {toast} from "react-toastify";
import {toastConfig} from "../../config";

export default [

]