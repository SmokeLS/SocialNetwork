import React from 'react';
import { ProfileType } from '../../../types/types';

type PropsType = {
  profile: ProfileType;
  isOwner: boolean;
  changeMode: () => void;
}

const FormProfileData : React.FC<PropsType> = (props) => {
  const { aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName } = props.profile;

  return (
    <div>
      {props.isOwner && <button onClick={props.changeMode}>Edit</button>}
      <div>fullName: {fullName}</div>
      <div>About me: {aboutMe}</div>
      <div>Looking for a job: {lookingForAJob ? 'Yes' : 'No'}</div>
      <div>Looking for a job description: {lookingForAJobDescription} </div>
      <div>
        {Object.keys(contacts).map((key)  => {
          //@ts-ignore
          return (<div key={key}> {key} : {contacts[key]} </div>);
        })}
      </div>
    </div>
  );
};

export default FormProfileData;
