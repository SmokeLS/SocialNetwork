import React from 'react';
import { getUsersProfile, getUserStatus, setUserStatus } from '../../redux/profile-reducer';
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../hoc/withAuthRedirect.js';
import { compose } from 'redux';
class ProfileContainer extends React.Component {
  componentDidMount() {
    const { getUsersProfile, getUserStatus, history } = this.props;

    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.userId;
      if (!userId) {
        history.push('/login');
        return;
      }
    }
    getUsersProfile(userId);
    getUserStatus(userId);
  }

  render() {
    return <Profile {...this.props} setUserStatus={this.props.setUserStatus} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id,
  };
};

export default compose(
  connect(mapStateToProps, { getUsersProfile, getUserStatus, setUserStatus }),
  withRouter,
)(ProfileContainer);
