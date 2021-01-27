import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { Route, withRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setInitializedSettings } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {
  componentDidMount() {
    this.props.setInitializedSettings();
  }

  render() {
    if (!this.props.initialized) return <Preloader />;

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(withRouter, connect(mapStateToProps, { setInitializedSettings }))(App);
