import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import {ThemeProvider, CssBaseline} from '@material-ui/core';
import LightTheme from './themes/Light';

// Pages
import NotFoundPage from '../NotFoundPage';
import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import Dashboard from '../Dashboard';


const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline/>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/app/dashboard"/>
          <Route path="/app/dashboard" component={Dashboard}/>
          <Route path="/auth/signin" component={SignInPage}/>
          <Route path="/auth/signup" component={SignUpPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
