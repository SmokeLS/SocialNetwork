import React from 'react';
import { Form, Field } from 'react-final-form';
import { required } from '../../../utils/validators/validator';
import { Input, Textarea } from './../../common/FormControl/FormControl';

const EditFormProfileData = (props) => {
  const { aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName, userId } = props.profile;

  const sendInformation = async (e) => {
    const response = await props.setUserProfileInformation(e, userId);
    if (response) return response;
    props.changeMode();
  };

  return (
    <Form
      initialValues={props.profile}
      onSubmit={(e) => sendInformation(e)}
      validate={required}
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
                <input {...props.input} {...props.meta} type="checkbox" />
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
              {submitError.map((error) => (
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
