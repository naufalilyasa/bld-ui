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
  LockOutlined as LockOutlinedIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 48,
    height: 48,
  },
}));

const SignInForm: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <Box marginTop={12}>
      <Grid container justify="center">
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
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
        <TextField
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
          Sign In
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
  );
};

export default SignInForm;
