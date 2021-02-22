import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setInitializedSettings } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import withLazyLoading from './components/hoc/withLazyLoading';
import HeaderContainer from './components/Header/HeaderContainer';

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const NotFoundPage = React.lazy(() => import('./components/Pages/NotFoundPage'));

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
          <Switch>
            <Route path="/" exact>
              <Redirect to="/profile" />
            </Route>
            <Route path="/dialogs" render={withLazyLoading(DialogsContainer)} />
            <Route path="/profile/:userId?" render={withLazyLoading(ProfileContainer)} />
            <Route path="/users" render={withLazyLoading(UsersContainer)} />
            <Route path="/login" render={() => <Login />} />
            <Route path="*" render={withLazyLoading(NotFoundPage)} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(withRouter, connect(mapStateToProps, { setInitializedSettings }))(App);
