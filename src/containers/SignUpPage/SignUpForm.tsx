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
import {
  Link as RouterLink,
  useHistory,
} from 'react-router-dom';

import {
  Person as PersonIcon,
} from '@material-ui/icons';
import {useFormik} from 'formik';
import {User} from '../../stores/CredentialStore';
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

const SignUpForm: React.FC<{}> = () => {
  const classes = useStyles();
  const history = useHistory();

  const credentialStore = useCredentialStore();
  const formikOnSubmit = (data: User) => {
    credentialStore.register(data, history);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
      name: '',
      registration_number: '',
      phone_number: '',
      address: '',
    },
    onSubmit: formikOnSubmit,
  });

  return useObserver(() => (
    <Box marginTop={2}>
      <Grid container justify="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            <PersonIcon/>
          </Avatar>
        </Grid>
      </Grid>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          label="Email"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              name="confirm_password"
              label="Confirm password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <TextField
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          value={formik.values.registration_number}
          onChange={formik.handleChange}
          name="registration_number"
          label="Registration number"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          name="phone_number"
          label="Phone number"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          value={formik.values.address}
          onChange={formik.handleChange}
          name="address"
          label="Address"
          multiline
          type="text"
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
              <Typography>Sign Up</Typography>}
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/auth/signin">
              <Typography>
                Sign In
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  ));
};

export default SignUpForm;
