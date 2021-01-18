import React from 'react';
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from 'react-redux';
import withAuthRedirect from '../hoc/withAuthRedirect.js';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return (
        {
            dialogsPage: state.dialogsPage
        }
    )
}

const mapDispatchToProps = (dispatch) => {
    return ({
        sendMessage : (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    })
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
