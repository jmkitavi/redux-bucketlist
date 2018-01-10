import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router';
import jwt from 'jsonwebtoken';
import App from './components/App';
import SignUpPage from './components/user/signup/SignUpPage';
import LoginPage from './components/user/login/LoginPage';
import LogOutPage from './components/user/logout/LogOutPage';
import BucketListsPage from './components/bucketlists/BucketListsPage';


const Routes = () => (
  <App>
    <Switch>
      <PrivateRoute exact path="/" component={BucketListsPage} />
      <PrivateRoute exact path="/home" component={BucketListsPage} />
      <LoginRoute exact path="/login" component={LoginPage} />
      <LoginRoute exact path="/signup" component={SignUpPage} />
      <PrivateRoute exact path="/logout" component={LogOutPage} />
    </Switch>
  </App>
);

var loggedIn = () => {
  let token  = localStorage.getItem('Authorization')
  let decodedToken = jwt.decode(token, {complete: true})
  let dateNow = new Date()
  if (!decodedToken) {
    return false
  } else {
    if (decodedToken.header.exp > (dateNow.getTime() / 1000)) { // hack to remove milliseconds
      return true
    } else {
      return false
    }
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
      
    )
  )}/>
)

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn() ? (
      <Redirect to={{
        pathname: '/home',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props}/>
    )
  )}/>
)

export default Routes;
