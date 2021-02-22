import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/user.png';
import ProfileStatus from './ProfileStatus';
import FormProfileData from './FormProfileData';
import EditFormProfileData from './EditFormProfileData';

const ProfileInfo = (props) => {
  const {
    profile,
    setUserStatus,
    status,
    isOwner,
    setAvatar,
    changeMode,
    editProfileMode,
    setUserProfileInformation,
  } = props;

  if (!props.profile) {
    return <Preloader />;
  }

  const setNewAvatar = (e) => {
    if (e.target.files.length) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img alt="#" src={profile.photos.large ? profile.photos.large : userPhoto} />
        {isOwner ? <input type="file" onChange={setNewAvatar} /> : ''}
        <ProfileStatus status={status} setUserStatus={setUserStatus} />
        {!editProfileMode ? (
          <FormProfileData profile={profile} isOwner={isOwner} changeMode={changeMode} />
        ) : (
          <EditFormProfileData {...props} setUserProfileInformation={setUserProfileInformation} />
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
