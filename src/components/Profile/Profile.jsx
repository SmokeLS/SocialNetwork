import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
  const {
    profile,
    status,
    setUserStatus,
    isOwner,
    setAvatar,
    changeMode,
    editProfileMode,
    setUserProfileInformation,
    userId,
  } = props;

  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        setUserStatus={setUserStatus}
        setAvatar={setAvatar}
        changeMode={changeMode}
        editProfileMode={editProfileMode}
        setUserProfileInformation={setUserProfileInformation}
        userId={userId}
      />
      <MyPostsContainer profile={profile} />
    </div>
  );
};

export default Profile;
