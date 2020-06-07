import React from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Link,
  Typography,
  Avatar,
  makeStyles,
  Theme,
  CircularProgress,
} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import {useFormik} from 'formik';

import {
  LockOutlined as LockOutlinedIcon,
} from '@material-ui/icons';

import {useCredentialStore} from '../../contexts/CredentialStoreContext';
import {useObserver} from 'mobx-react';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 48,
    height: 48,
  },
  loading: {
    color: theme.palette.common.white,
  },
}));

const SignInForm: React.FC<{}> = () => {
  const classes = useStyles();

  const credentialStore = useCredentialStore();
  const formikOnSubmit = ({email, password}: {email: string, password: string}) => {
    credentialStore.login(email, password);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: formikOnSubmit,
  });

  return useObserver(() => (
    <Box marginTop={12}>
      <Grid container justify="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
        </Grid>
      </Grid>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          disabled={credentialStore.isLoading}
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          label="Email"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          disabled={credentialStore.isLoading}
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Box marginY={2}>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            fullWidth
          >
            {credentialStore.isLoading ?
              <CircularProgress className={classes.loading} size={32}/> :
              <Typography>Sign In</Typography>
            }
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/auth/signup">
              <Typography>
                Sign Up
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  ));
};

export default SignInForm;
