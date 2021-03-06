import { createBrowserHistory } from 'history';
import { Switch, Route, Router } from 'react-router-dom';
import React from 'react';

import ErrorPage from '../pages/404';
import Home from '../pages/home';
import Calendar from '../pages/calendar';

export const history = createBrowserHistory();

const CustomBrowserRouter: React.FC = ({ children }) => (
  <Router history={history}>{children}</Router>
);

const Routes = () => (
  <CustomBrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/calendar" component={Calendar} />
      <Route path="/*" component={ErrorPage} />
    </Switch>
  </CustomBrowserRouter>
);

export default Routes;
