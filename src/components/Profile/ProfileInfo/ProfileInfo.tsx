import React, { ChangeEvent } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/user.png';
import ProfileStatus from './ProfileStatus';
import FormProfileData from './FormProfileData';
import EditFormProfileData from './EditFormProfileData';
import { ProfileType } from '../../../types/types';
import { SetUserThunkType, ThunkType } from '../../../redux/profile-reducer';

type PropsType = {
  profile: ProfileType | null;
  setUserStatus: (status: string) => ThunkType;
  status: string;
  isOwner: boolean;
  setAvatar: (file: File | null) => ThunkType;
  changeMode: () => void;
  editProfileMode: boolean;
  setUserProfileInformation: (information: ProfileType) => SetUserThunkType;
}

const ProfileInfo : React.FC<PropsType> = (props) => {
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

  if (!profile) {
    return <Preloader />;
  }

  const setNewAvatar = (e : ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;
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
