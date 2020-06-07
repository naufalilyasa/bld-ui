import React from 'react';
import SignInForm from './SignInForm';
import {Container} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useObserver} from 'mobx-react';
import {Redirect} from 'react-router-dom';

import {useCredentialStore} from '../../contexts/CredentialStoreContext';

const SignInPage: React.FC<{}> = () => {
  const credentialStore = useCredentialStore();

  return useObserver(() => !credentialStore.isAuthenticated ? (
    <React.Fragment>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Container maxWidth="xs">
        <SignInForm/>
      </Container>
    </React.Fragment>
  ): <Redirect to="/"/>);
};

export default SignInPage;
