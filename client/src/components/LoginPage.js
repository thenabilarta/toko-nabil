import React from 'react';
import {withRouter} from 'react-router-dom';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {loginUser} from '../actions/user_actions';

function LoginPage(props) {
  const dispatch = useDispatch();

  return (
    <div className="login">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        })}
        onSubmit={(values) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password,
            };
            dispatch(loginUser(dataToSubmit)).then(() =>
              props.history.push('/')
            );
          }, 500);
        }}
      >
        {({errors, touched, isSubmitting}) => (
          <Form>
            <ul>
              <li>
                <label htmlFor="email">Email</label>
                <Field className="field" name="email" type="email" />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <Field className="field" name="password" type="password" />
                {errors.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </li>
              <li>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </li>
            </ul>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default withRouter(LoginPage);
