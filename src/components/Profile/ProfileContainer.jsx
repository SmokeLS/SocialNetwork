import React from 'react';
import { getUsersProfile } from "../../redux/profile-reducer";
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 13980;
        }
        this.props.getUsersProfile(userId);
    }

    render() {
        if (!this.props.auth)
               return <Redirect to={'/login'}/>

        return (
            <Profile {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        auth: state.auth.isAuth
    }
}

const ProfileContainerWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUsersProfile })(ProfileContainerWithRouter);