import React from 'react';
import { Route, Switch } from 'react-router';
import App from './components/App';


const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </App>
);

export default Routes;
