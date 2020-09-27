import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../actions/user_actions';
const logo = require('../assets/tokonabil.png');

function Navbar(props) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser())
      .then(props.history.push('/'))
      .then(window.location.reload(false));
  };

  return (
    <div className="navbar">
      <div className="brand">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="link">
        {user.userData && !user.userData.isAuth ? (
          <React.Fragment>
            <Link className="link-text" to="/register">
              Daftar
            </Link>
            <Link className="link-text" to="/login">
              Login
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link className="link-text" to="/upload">
              Upload
            </Link>
            <Link className="link-text" to="" onClick={logoutHandler}>
              Logout
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default withRouter(Navbar);
