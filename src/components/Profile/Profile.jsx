import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
  const { profile, status, setUserStatus } = props;

  return (
    <div>
      <ProfileInfo profile={profile} status={status} setUserStatus={setUserStatus} />
      <MyPostsContainer profile={profile} />
    </div>
  );
};

export default Profile;
