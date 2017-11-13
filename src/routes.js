import React from 'react';
import { Route, Switch } from 'react-router';
import App from './components/App';
import LoginPage from './components/login/LoginPage';

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={LoginPage}/>
    </Switch>
  </App>
);

export default Routes;
