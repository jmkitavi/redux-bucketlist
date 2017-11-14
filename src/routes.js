import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router';
import jwt from 'jsonwebtoken';
import App from './components/App';
import LoginPage from './components/login/LoginPage';
import HomePage from './components/home/HomePage';
import BucketListsPage from './components/bucketlists/BucketListsPage';


const Routes = () => (
  <App>
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/home" component={HomePage} />
      <PrivateRoute exact path="/bucketlist" component={BucketListsPage} />
      <Route exact path="/login" component={LoginPage} />
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
const status = loggedIn()

console.log(status)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    status ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default Routes;
