import React from 'react';
import Header from './Header.jsx';
import { getMyProfile } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { onExit } from './../../redux/auth-reducer';
class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getMyProfile();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email,
  };
};

export default connect(mapStateToProps, { getMyProfile, onExit })(HeaderContainer);
