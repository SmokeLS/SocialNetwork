import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader.js';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  const { profile, setUserStatus, status } = props;

  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img alt="#" src={profile.photos.large} />
        <ProfileStatus status={status} setUserStatus={setUserStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
