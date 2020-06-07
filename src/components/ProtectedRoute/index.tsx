import React from 'react';
import {observer} from 'mobx-react';
import {RouteProps, Redirect, Route} from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps{
  isAuthenticated: boolean;
  isAllowed: boolean;
  restrictedPath?: string;
  authenticationPath?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({
  isAuthenticated,
  isAllowed,
  restrictedPath,
  authenticationPath,
  ...args
}) => {
  let redirectPath: string = '';
  restrictedPath = restrictedPath || '/403';
  authenticationPath = authenticationPath || '/auth/signin';

  if (!isAuthenticated) {
    redirectPath = authenticationPath;
  }

  if (isAuthenticated && !isAllowed) {
    redirectPath = restrictedPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{pathname: redirectPath}}/>;
    return <Route {...args} component={renderComponent}/>;
  } else {
    return <Route {...args} />;
  }
});

export default ProtectedRoute;
