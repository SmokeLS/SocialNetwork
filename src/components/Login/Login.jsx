import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { signIn } from '../../redux/auth-reducer';
import { Input } from '../common/FormControl/FormControl';
import { required } from './../../utils/validators/validator';

const Login = (props) => {
  const onSubmit = ({ login, password, rememberMe = false, captchaUrl = null }) => {
    props.signIn(login, password, rememberMe, captchaUrl);
  };

  return (
    <div>
      <h1>Login</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="login" validate={required}>
              {(props) => (
                <div>
                  <label>Login</label>
                  <Input {...props} />
                </div>
              )}
            </Field>

            <Field name="password" type="password" validate={required}>
              {(props) => (
                <div>
                  <label>Password</label>
                  <Input {...props} />
                </div>
              )}
            </Field>

            <div>
              <label>Remember me</label>
              <Field name="rememberMe" component="input" type="checkbox" />
            </div>

            {props.captchaUrl && <img src={props.captchaUrl} alt="#" />}
            {props.captchaUrl && (
              <Field name="captchaUrl" type="text" validate={required}>
                {(props) => (
                  <div>
                    <label>Captcha: </label>
                    <Input {...props} />
                  </div>
                )}
              </Field>
            )}

            <button type="submit">Submit</button>
            <div>{props.error}</div>
          </form>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  error: state.auth.error,
  captchaUrl: state.auth.captchaUrl,
});

const LoginReactForm = connect(mapStateToProps, { signIn })(Login);

export default LoginReactForm;
