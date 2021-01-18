import React from "react";
import { Field, Form } from "react-final-form";
import { required } from './../../utils/validators/validator';

const Login = (props) => {
    
    return (
        <div>
            <h1>Login</h1>
            <LoginForm {...props}/>
        </div>
    )
}


const onSubmit = (formData) => {
    console.log(formData);
}

const validate = () => {
    console.log(true);
}

const LoginForm = (props) => (
    <Form
      onSubmit={onSubmit}
      validate={(e) => console.log()}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>login</label>
            <Field name="firstName" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <div>
            <label>password</label>
            <Field name="password" component="input" placeholder="password" >
            {props => (
              <div>
                <input {...props.input} />
              </div>
            )}
            </Field>
          </div>

          <div>
            <label>Remember me</label>
            <Field name="rememberMe" component="input" type="checkbox" />
          </div>
  
          <button type="submit">Submit</button>
        </form>
      )}
    />
)

export default Login;