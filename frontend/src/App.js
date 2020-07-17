import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import {Route, Switch} from "react-router-dom";
import Register from "./components/Register/Register";
import MainPage from "./components/MainPage/MainPage";
import Login from "./components/Login/Login";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div>
            <ToastContainer />
            <Navigation/>
            <Switch>
                <Route path='/register' exact component={Register}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/' exact component={MainPage}/>
            </Switch>
        </div>
    );
}

export default App;
