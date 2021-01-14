import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { getUsersProfile } from "../../redux/profile-reducer";
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.match.params.userId;

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

const ProfileContainerWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUsersProfile })(ProfileContainerWithRouter);