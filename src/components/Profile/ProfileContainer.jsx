import React from 'react';
import { getUsersProfile } from "../../redux/profile-reducer";
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../hoc/withAuthRedirect.js';
import { compose } from 'redux';
class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 13980;
        }
        this.props.getUsersProfile(userId);
    }

    render() {
        return (
            <Profile {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

export default compose(
    connect(mapStateToProps, { getUsersProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
