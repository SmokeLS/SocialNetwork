import {InitialStateType, actions } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthRedirect from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  dialogsPage: InitialStateType
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose(withAuthRedirect, 
  connect<MapStatePropsType, {}, unknown, AppStateType>(mapStateToProps, {...actions}))
(Dialogs);
