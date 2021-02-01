import React from 'react';
import {
  getUsersProfile,
  getUserStatus,
  setUserStatus,
  setAvatar,
  changeMode,
  setUserProfileInformation,
} from '../../redux/profile-reducer';
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  refreshProfile() {
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

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile {...this.props} isOwner={!this.props.match.params.userId} setUserStatus={this.props.setUserStatus} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id,
    editProfileMode: state.profilePage.editProfileMode,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUsersProfile,
    getUserStatus,
    setUserStatus,
    setAvatar,
    changeMode,
    setUserProfileInformation,
  }),
  withRouter,
)(ProfileContainer);
