import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import { NavLink, Route, BrowserRouter, Switch } from 'react-router-dom'
import Scoreboard from './containers/Scoreboard';
import Admin from './containers/Admin'
import Profile from './containers/Profile'
import ScoreboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import AdminIcon from '@material-ui/icons/Settings';
import AccountIcon from '@material-ui/icons/AccountBox';
import IconButton from '@material-ui/core/IconButton';
import GamesIcon from '@material-ui/icons/ViewList';
import Hidden from '@material-ui/core/Hidden';
import { useAuth0 } from "./react-auth0-wrapper";
import PrivateRoute from "./components/PrivateRoute";
import CircularProgress from '@material-ui/core/CircularProgress';
import GamesList from './containers/GamesList';

// eslint-disable-next-line react/display-name
const NavRef = React.forwardRef((props, ref) => <div ref={ref}><NavLink {...props}/></div>);

function App(props) {

	const classes = useStyles();
	const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();

	const [mobileOpen, setMobileOpen] = useState(false);

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}

	if (loading) {
		return (
			<CircularProgress/>
		);
	}

	return (
		<div className={classes.app}>
			<BrowserRouter>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<img src={'https://firebasestorage.googleapis.com/v0/b/thrones-818e8.appspot.com/o/throne.PNG?alt=media&token=bcc76194-ac99-4334-a200-dcaa5376f10a'} style={{width:50, paddingRight:8}} alt='throne'/>
					<Typography variant="h6" noWrap>
						Thrones
					</Typography>
					{ isAuthenticated ? (
					<div style={{marginLeft: 'auto', display:'flex'}}>
						<img src={user.picture} style={{borderRadius:'50%', width:50}}/>
						<Button variant='contained' onClick={() => logout()}>Logout</Button>
					</div>
					) : (
						<div style={{marginLeft: 'auto', display:'flex'}}>
							<Button variant='contained' onClick={() => loginWithRedirect({})}>Login</Button>
						</div>		
					)}
				</Toolbar>
			</AppBar>
			<Hidden smUp implementation="css">
				<Drawer 
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					anchor='left'
					className={classes.drawer}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<div className={classes.toolbar}>
						<img src={'https://firebasestorage.googleapis.com/v0/b/thrones-818e8.appspot.com/o/throne.PNG?alt=media&token=bcc76194-ac99-4334-a200-dcaa5376f10a'} style={{width:50, paddingRight:8}} alt='throne'/>
						<Typography variant="h6">Thrones</Typography>
					</div>
					<List>
						<ListItem button component={NavRef} to='/'>
							<ListItemIcon><ScoreboardIcon/></ListItemIcon>
							<ListItemText>Scoreboard</ListItemText>
						</ListItem>
						<ListItem button component={NavRef} to='/games'>
							<ListItemIcon><GamesIcon/></ListItemIcon>
							<ListItemText>Games</ListItemText>
						</ListItem>						
						<ListItem button component={NavRef} to='/profile'>
							<ListItemIcon><AccountIcon/></ListItemIcon>
							<ListItemText>Profile</ListItemText>
						</ListItem>
						<ListItem button component={NavRef} to='/admin'>
							<ListItemIcon><AdminIcon/></ListItemIcon>
							<ListItemText>Admin</ListItemText>
						</ListItem>
					</List>
				</Drawer>	
			</Hidden>	
			<Hidden xsDown implementation="css">
				<Drawer 
					variant='permanent'
					anchor='left'
					className={classes.drawer}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.toolbar} />
					<List>
						<ListItem button component={NavRef} to='/'>
							<ListItemIcon><ScoreboardIcon/></ListItemIcon>
							<ListItemText>Scoreboard</ListItemText>
						</ListItem>
						<ListItem button component={NavRef} to='/games'>
							<ListItemIcon><GamesIcon/></ListItemIcon>
							<ListItemText>Games</ListItemText>
						</ListItem>						
						<ListItem button component={NavRef} to='/profile'>
							<ListItemIcon><AccountIcon/></ListItemIcon>
							<ListItemText>Profile</ListItemText>
						</ListItem>
						<ListItem button component={NavRef} to='/admin'>
							<ListItemIcon><AdminIcon/></ListItemIcon>
							<ListItemText>Admin</ListItemText>
						</ListItem>
					</List>
				</Drawer>
			</Hidden>	
			
			<div className={classes.content}>
				<div className={classes.toolbar} />
					<Switch>
						<Route path="/" exact component={Scoreboard} />
						<Route path="/games" exact component={GamesList} />
						<PrivateRoute path="/admin" exact component={Admin} />
						<PrivateRoute path="/profile" exact component={Profile} />
					</Switch>	
			</div>
			</BrowserRouter>
		</div>
	);
}

export default App;

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	toolbar: {
		...theme.mixins.toolbar,
		display: 'flex',
		alignItems: 'center'
	},
	drawerPaper: {
		width: drawerWidth,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	content: {
		width:'100%',
	},
	app: {
		display: 'flex',
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
  }));
