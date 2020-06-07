import React from 'react';
import {Helmet} from 'react-helmet';
import {Container} from '@material-ui/core';
import SignUpForm from './SignUpForm';
import {useCredentialStore} from '../../contexts/CredentialStoreContext';
import {useObserver} from 'mobx-react';
import {Redirect} from 'react-router-dom';

const SignUpPage: React.FC<{}> = () => {
  const credentialStore = useCredentialStore();

  return useObserver(() => !credentialStore.isAuthenticated ? (
    <React.Fragment>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Container maxWidth="xs">
        <SignUpForm/>
      </Container>
    </React.Fragment>
  ): <Redirect to="/" />);
};

export default SignUpPage;
