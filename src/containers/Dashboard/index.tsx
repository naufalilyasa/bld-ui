import React from 'react';
import {useObserver} from 'mobx-react';
import {Helmet} from 'react-helmet';
import {Redirect, RouteChildrenProps} from 'react-router-dom';

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

import ProtectedRoute from '../../components/ProtectedRoute';

import HomePage from '../HomePage';
import DocumentsPage from '../DocumentsPage';
import DashboardMenu from '../../components/Menu';
import StudentsPage from '../UsersPage';

import {useCredentialStore} from '../../contexts/CredentialStoreContext';
import {DocumentsProvider} from '../../components/DocumentDataTable/Context';

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
      backgroundColor: '#eee',
      minHeight: '100vh',
      height: '100%',
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

  const credentialStore = useCredentialStore();

  const handleLogoutButton = () => {
    credentialStore.logout();
  };

  return useObserver(() => (
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
              <IconButton onClick={handleLogoutButton} color="inherit">
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
          <DocumentsProvider>
            <ProtectedRoute
              isAuthenticated={credentialStore.isAuthenticated}
              isAllowed
              path="/app/dashboard/home"
              component={HomePage}
            />
          </DocumentsProvider>
          <DocumentsProvider>
            <ProtectedRoute
              isAuthenticated={credentialStore.isAuthenticated}
              isAllowed
              path="/app/dashboard/documents"
              component={DocumentsPage}
            />
          </DocumentsProvider>
          <ProtectedRoute
            isAuthenticated={credentialStore.isAuthenticated}
            isAllowed
            path="/app/dashboard/users"
            component={StudentsPage}
          />
        </main>
      </div>
    </React.Fragment>
  ));
};

export default Dashboard;
