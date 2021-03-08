import React from 'react';
import Header from './Header';
import { getMyProfile, ThunkType } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { onExit } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  isAuth: boolean;
  login: string | null;
  email: string| null;
}

type MapDispatchPropsType = {
  getMyProfile:() => ThunkType;
  onExit:() => Promise<void>;
}


type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType>{
  componentDidMount() {
    this.props.getMyProfile();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email,
  };
};

export default connect(mapStateToProps, { getMyProfile, onExit })(HeaderContainer);
