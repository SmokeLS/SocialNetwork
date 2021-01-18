import React from "react";
import { Field, Form } from "react-final-form";

const Login = (props) => {
    
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

const onSubmit = (formData) => {
    console.log(formData);
}

const validate = () => {
    console.log(true);
}

const LoginForm = () => (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>login</label>
            <Field name="login" component="input" placeholder="login" />
          </div>

          <div>
            <label>password</label>
            <Field name="password" component="input" placeholder="password" />
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