import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setInitializedSettings } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import withLazyLoading from './components/hoc/withLazyLoading';
import HeaderContainer from './components/Header/HeaderContainer';

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// const HeaderContainer = React.lazy(() => import('./components/Header/HeaderContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

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
          <Route path="/dialogs" render={withLazyLoading(DialogsContainer)} />
          <Route path="/profile/:userId?" render={withLazyLoading(ProfileContainer)} />
          <Route path="/users" render={withLazyLoading(UsersContainer)} />
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
