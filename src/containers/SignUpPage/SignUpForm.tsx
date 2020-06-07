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
} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

import {
  Person as PersonIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 48,
    height: 48,
  },
}));

const SignUpForm: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <Box marginTop={2}>
      <Grid container justify="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            <PersonIcon/>
          </Avatar>
        </Grid>
      </Grid>
      <form>
        <TextField
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
          name="name"
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          name="registration_number"
          label="Registration number"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          name="phone_number"
          label="Phone number"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
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
          Sign Up
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
  );
};

export default SignUpForm;
