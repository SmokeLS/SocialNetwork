import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import {Route} from "react-router-dom";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = () => {
    return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={ () => <DialogsContainer /> }/>
                    <Route path='/profile/:userId?'
                           render={ () => <ProfileContainer /> }/>
                    <Route path='/users'
                           render={ () => <UsersContainer /> }/>
                    <Route path='/login'
                           render={() => <Login />} />
                </div>
            </div>
        )
}

export default App;