import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router';
import App from './components/App';
import LoginPage from './components/login/LoginPage';
import HomePage from './components/home/HomePage';

const Routes = () => (
  <App>
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/home" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </App>
);

let token = localStorage.getItem('Authorization')

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    token ? (
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
