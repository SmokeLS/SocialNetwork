import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
  profile: ProfileType | null;
  status: string;
  setUserStatus: () => void;
  isOwner: boolean;
  setAvatar: () => void;
  changeMode:() => void;
  editProfileMode: boolean;
  setUserProfileInformation: () => void;
  userId: number | null;
}

const Profile : React.FC<PropsType> = (props) => {
  const {
    profile,
    status,
    setUserStatus,
    isOwner,
    setAvatar,
    changeMode,
    editProfileMode,
    setUserProfileInformation,
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
      />
      <MyPostsContainer profile={profile} />
    </div>
  );
};

export default Profile;
