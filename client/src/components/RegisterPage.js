import React from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../actions/user_actions';

function Register(props) {
  const image = `http://gravatar.com/avatar/${moment().unix()}?d=identicon`;

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div className="register">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          image: image,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
          dispatch(registerUser(values))
            .then(swal('Akun berhasil dibuat', {buttons: false, timer: 1000}))
            .then(() => props.history.push('/login'));
        }}
      >
        {({errors, touched, isSubmitting}) => (
          <Form>
            <ul>
              <li>
                <label htmlFor="name">Nama</label>
                <Field className="field" name="name" id="name" />
                {errors.name && touched.name ? <p>{errors.name}</p> : null}
              </li>
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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  className="field"
                  name="confirmPassword"
                  type="password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p>{errors.confirmPassword}</p>
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

export default Register;
