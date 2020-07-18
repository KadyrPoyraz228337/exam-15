import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import usersReducer from "./reducers/usersReducer";
import placesReducer from "./reducers/placesReducer";
import reviewsReducer from "./reducers/reviewsReducer";
import imagesReducer from "./reducers/imagesReducer";

export default history => combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    places: placesReducer,
    reviews: reviewsReducer,
    images: imagesReducer
})