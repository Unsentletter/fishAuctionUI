import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import NewUser from './Components/NewUser';
import UserProfile from './Components/UserProfile';
import Login from './Components/Login'

const auth = {
  isAuthenticated() {
    console.log("AUTH", localStorage);
    return localStorage.token
  },
  logout() {
    console.log("LOGOUT", localStorage);
    localStorage.removeItem('token');
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("isAuthed", auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/create_user",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/create_user' component={NewUser}/>
            <PrivateRoute path='/user_profile' component={UserProfile}/>
            <Redirect path='/logout' to='/login' innerRef={auth.logout}/>
          </div>
        </BrowserRouter>
      </div>
    )
  };
}

export default App;
