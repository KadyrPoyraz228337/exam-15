import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import {Route, Switch} from "react-router-dom";
import Register from "./components/Register/Register";
import MainPage from "./components/MainPage/MainPage";
import Login from "./components/Login/Login";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./HOC/PrivatRoute/PrivatRoute";
import AddPlace from "./components/AddPlace/AddPlace";
import Place from "./components/Place/Place";

function App() {
    return (
        <div>
            <ToastContainer />
            <Navigation/>
            <Switch>
                <Route path='/register' exact component={Register}/>
                <Route path='/login' exact component={Login}/>
                <PrivateRoute path='/' exact component={MainPage}/>
                <PrivateRoute path='/add/places' exact component={AddPlace}/>
                <PrivateRoute path='/places/:id' exact component={Place}/>
            </Switch>
        </div>
    );
}

export default App;
