import React from 'react';

const FormProfileData = (props) => {
  const { aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName } = props.profile;

  console.log(lookingForAJob);
  return (
    <div>
      {props.isOwner && <button onClick={props.changeMode}>Edit</button>}
      <div>fullName: {fullName}</div>
      <div>About me: {aboutMe}</div>
      <div>Looking for a job: {lookingForAJob ? 'Yes' : 'No'}</div>
      <div>Looking for a job description: {lookingForAJobDescription} </div>
      <div>
        {Object.keys(contacts).map((key) => {
          return (
            <div key={key}>
              {key} : {contacts[key]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProfileData;
