import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

// Pages
import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';

const App: React.FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/auth/signin" component={SignInPage}/>
        <Route path="/auth/signup" component={SignUpPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  );
};

export default App;
