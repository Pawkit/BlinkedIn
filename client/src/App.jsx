import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Auth from './pages/Auth';
import Jobs from './pages/Jobs';

import RestrictedRoute from './components/RestrictedRoute';

const App = () => (
  <Switch>
    {/* Public Paths */}
    <Route path="/register" component={Auth} />
    <Route path="/login" component={Auth} />

    {/* Private Paths */}
    <RestrictedRoute type="private" path="/jobs" component={Jobs} />

    {/* Redirects
      Please remove this redirect once you got home page on route '/'
    */}
    <Redirect from="/" to="/login" />
  </Switch>
);

export default App;
