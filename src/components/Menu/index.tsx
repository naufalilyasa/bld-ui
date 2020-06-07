import React from 'react';
import {
  useLocation,
  Link,
  LinkProps,
} from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Avatar,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Assignment as DocumentIcon,
  Group as PeopleIcon,
} from '@material-ui/icons';

const useStyles = makeStyles({
  avatar: {
    width: 48,
    height: 48,
  },
});

// eslint-disable-next-line react/display-name
const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ref as any} {...props} />
));

const Menu: React.FC<{}> = (props) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <React.Fragment>
      <Box padding={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar className={classes.avatar}>A</Avatar>
          </Grid>
          <Grid item>
            <Typography>Alexandria</Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider/>
      <List>
        <ListItem
          button
          selected={location.pathname === '/app/dashboard/home'}
          component={AdapterLink}
          to="/app/dashboard/home"
        >
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem
          button
          selected={location.pathname === '/app/dashboard/documents'}
          component={AdapterLink}
          to="/app/dashboard/documents"
        >
          <ListItemIcon>
            <DocumentIcon/>
          </ListItemIcon>
          <ListItemText>Documents</ListItemText>
        </ListItem>
        <ListItem
          button
          selected={location.pathname === '/app/dashboard/users'}
          component={AdapterLink}
          to="/app/dashboard/users"
        >
          <ListItemIcon>
            <PeopleIcon/>
          </ListItemIcon>
          <ListItemText>Users</ListItemText>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Menu;
