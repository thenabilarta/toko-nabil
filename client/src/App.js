import React from 'react';
import {Route, Switch} from 'react-router-dom';
import auth from './auth';

import LandingPage from './components/LandingPage.js';
import ProductPage from './components/ProductPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UploadPage from './components/UploadPage';

function App() {
  return (
    <div className="grid-container">
      <Navbar />
      <div className="app">
        <Switch>
          <Route exact path="/" component={auth(LandingPage, null)} />
          <Route
            exact
            path="/product/:id"
            component={auth(ProductPage, null)}
          />
          <Route exact path="/login" component={auth(LoginPage, false)} />
          <Route exact path="/register" component={auth(RegisterPage, false)} />
          <Route exact path="/upload" component={auth(UploadPage, true)} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
