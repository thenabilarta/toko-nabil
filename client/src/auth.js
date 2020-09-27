import React, {useEffect} from 'react';
import {auth} from './actions/user_actions';
import {useSelector, useDispatch} from 'react-redux';

export default function (ComposedClass, reload) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        if (await !response.payload.isAuth) {
          if (reload) {
            props.history.push('/');
          }
        } else {
          if (await response.payload.isAuth) {
            if (reload === false) {
              props.history.push('/');
            }
          }
        }
      });
    }, [dispatch, props.history, user.googleAuth]);

    return <ComposedClass {...props} user={user} />;
  }
  return AuthenticationCheck;
}
