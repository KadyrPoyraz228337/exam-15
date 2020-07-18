import {all} from "@redux-saga/core/effects";
import usersSagas from "./sagas/usersSagas";
import placesSagas from "./sagas/placesSagas";
import reviewsSagas from "./sagas/reviewsSagas";
import imagesSagas from "./sagas/imagesSagas";

export default function* rootSaga() {
    yield all([
        ...usersSagas,
        ...placesSagas,
        ...reviewsSagas,
        ...imagesSagas
    ])
}