import React from 'react';
import {Helmet} from 'react-helmet';
import {Container} from '@material-ui/core';
import SignUpForm from './SignUpForm';

const SignUpPage: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Container maxWidth="xs">
        <SignUpForm/>
      </Container>
    </React.Fragment>
  );
};

export default SignUpPage;
