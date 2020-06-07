import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {Route, Redirect, RouteChildrenProps} from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import HomePage from '../HomePage';
import DocumentsPage from '../DocumentsPage';
import DashboardMenu from '../../components/Menu';
import LecturersPage from '../LecturersPage';
import StudentsPage from '../StudentsPage';

const drawerWidth: number = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface DashboardProps extends RouteChildrenProps {
  window?: () => Window;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const {window} = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = useStyles();

  // eslint-disable-next-line react/prop-types
  const {location} = props;

  const rootDashboardPaths: Array<string> = [
    '/app/dashboard',
    '/app/dashboard/',
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h5" noWrap className={classes.title}>Dashboard</Typography>
            <div>
              <IconButton color="inherit">
                <ExitToAppIcon/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <DashboardMenu/>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <DashboardMenu/>
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* eslint-disable-next-line react/prop-types */}
          {rootDashboardPaths.includes(location.pathname) && (
            <Redirect to="/app/dashboard/home"/>
          )}
          <Route path="/app/dashboard/home" component={HomePage}/>
          <Route path="/app/dashboard/documents" component={DocumentsPage}/>
          <Route path="/app/dashboard/lecturers" component={LecturersPage}/>
          <Route path="/app/dashboard/students" component={StudentsPage}/>
        </main>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
