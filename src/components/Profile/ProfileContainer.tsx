import React from 'react';
import {
  getUsersProfile,
  getUserStatus,
  setUserStatus,
  setAvatar,
  actions,
  setUserProfileInformation,
} from '../../redux/profile-reducer';
import Profile from './Profile';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ProfileType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  profile: ProfileType | null;
  status: string,
  userId: number| null,
  editProfileMode: boolean,
}

type MapDispatchPropsType = {
  getUsersProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  setUserStatus: () => void;
  setAvatar: () => void;
  changeMode: () => void;
  setUserProfileInformation: () => void;
}

type OwnPropsType = {
  userId?: string
}

type WithRouterType = RouteComponentProps<OwnPropsType> & {
 userId?: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & WithRouterType;

class ProfileContainer extends React.Component<PropsType>{
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

    const numUserId : number = Number(userId);

    getUsersProfile(numUserId);
    getUserStatus(numUserId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
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

const mapStateToProps = (state: AppStateType) : MapStatePropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id,
    editProfileMode: state.profilePage.editProfileMode,
  };
};

const changeMode = actions.changeMode;

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
