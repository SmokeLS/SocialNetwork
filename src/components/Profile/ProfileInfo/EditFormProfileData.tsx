import React from 'react';
import {  Field, withTypes } from 'react-final-form';
import { ProfileType } from '../../../types/types';
import { Input, Textarea } from '../../common/FormControl/FormControl';

type FinalFormType = {
  profile: ProfileType | null;
}

type PropsType = {
  profile: ProfileType | null;
  setUserProfileInformation: (e: Object) => void;
  changeMode: () => void;
  isOwner: boolean;
}

const EditFormProfileData : React.FC<PropsType> = (props) => {
  if(!props.profile) return null;
  const { contacts } = props.profile;
  
  const sendInformation = async (e: FinalFormType) => {
    const response : any = await props.setUserProfileInformation(e);
    if (response) return response;
    props.changeMode();
  };

  const {Form} = withTypes<FinalFormType, ProfileType>();

  return (
    <Form
      initialValues={props.profile}
      onSubmit={(values:FinalFormType) => sendInformation(values)}
      render={({ submitError, submitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>{props.isOwner && <button disabled={submitting}>Accept</button>}</div>
          <Field name="fullName">
            {(props) => (
              <div>
                <label>Full name:</label>
                <Input {...props} />
              </div>
            )}
          </Field>
          <Field name="aboutMe">
            {(props) => (
              <div>
                <label>About me:</label>
                <Textarea {...props} />
              </div>
            )}
          </Field>
          <Field name="lookingForAJob" type="checkbox">
            {(props) => (
              <div>
                <label>Looking for a job:</label>
                <input {...props.input} type="checkbox" />
              </div>
            )}
          </Field>
          <Field name="lookingForAJobDescription">
            {(props) => (
              <div>
                <label>Looking for a job description:</label>
                <Textarea {...props} />
              </div>
            )}
          </Field>
          {Object.keys(contacts).map((key) => {
            return (
              <Field key={key} name={`contacts.${key}`}>
                {(props) => {
                  return (
                    <div>
                      {key} : <Input key={key} {...props} />
                    </div>
                  );
                }}
              </Field>
            );
          })}
          {submitError && (
            <div className="error">
              {submitError.map((error : any) => (
                <div>{error}</div>
              ))}
            </div>
          )}
        </form>
      )}
    />
  );
};

export default EditFormProfileData;
