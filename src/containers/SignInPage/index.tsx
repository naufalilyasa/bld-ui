import React from 'react';
import SignInForm from './SignInForm';
import {Container} from '@material-ui/core';
import {Helmet} from 'react-helmet';

const SignInPage: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Container maxWidth="xs">
        <SignInForm/>
      </Container>
    </React.Fragment>
  );
};

export default SignInPage;
