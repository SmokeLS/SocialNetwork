import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {setUsersProfile} from "../../redux/profile-reducer";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import * as axios from "axios";
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.match.params;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
             .then((response) => {
                this.props.setUsersProfile(response.data);
                // this.props.isLoadingNow(false);
            });
    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

const ProfileContainerWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps,{setUsersProfile})(ProfileContainerWithRouter);