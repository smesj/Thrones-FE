import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink, Route, BrowserRouter, withRouter } from 'react-router-dom'
import Scoreboard from './containers/Scoreboard';
import Admin from './containers/Admin'
import ScoreboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import auth0Client from './Auth';
import SecuredRoute from './securedRoute/SecuredRoute';

// eslint-disable-next-line react/display-name
const NavRef = React.forwardRef((props, ref) => <div ref={ref}><NavLink {...props}/></div>);

function App(props) {

	const classes = useStyles();

	const [mobileOpen, setMobileOpen] = useState(false);
	const [user, setUser] = useState(undefined);
	const [checkingSession, setCheckingSession] = useState(true);

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}

	useEffect(() => {
		const silentAuth = async () => {
			if (props.location.pathname === '/callback') {
				try {
					await auth0Client.handleAuthentication();
				} catch (err) {
					console.log(err.error);
				}
			}

			try {
				await auth0Client.silentAuth();
				setUser(auth0Client.getProfile());
				props.history.replace('/');			
			} catch (err) {
				if (err.error !== 'login_required') console.log(err.error);
			}
		};
		silentAuth()	
	}, []);

	const signOut = () => {
		auth0Client.signOut();
		setUser(auth0Client.getProfile());
	};

	return (
		<div className={classes.app}>
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
				{/* <img src={process.env.PUBLIC_URL + 'assets/throne.PNG'} style={{width:50, paddingRight:8}} alt='throne'/> */}
				<img src={'https://firebasestorage.googleapis.com/v0/b/thrones-818e8.appspot.com/o/throne.PNG?alt=media&token=bcc76194-ac99-4334-a200-dcaa5376f10a'} style={{width:50, paddingRight:8}} alt='throne'/>
				<Typography variant="h6" noWrap>
					Thrones 2019
				</Typography>
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
					<div className={classes.toolbar} />
					<List>
						<ListItem button component={NavRef} to='/'>
							<ListItemIcon><ScoreboardIcon/></ListItemIcon>
							<ListItemText>Scoreboard</ListItemText>
						</ListItem>
						<ListItem button component={NavRef} to='/admin'>
							<ListItemIcon><ScoreboardIcon/></ListItemIcon>
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
						<ListItem button component={NavRef} to='/admin'>
							<ListItemIcon><ScoreboardIcon/></ListItemIcon>
							<ListItemText>Admin</ListItemText>
						</ListItem>
						{ !auth0Client.isAuthenticated() && 
							<ListItem button onClick={auth0Client.signIn}>
								<ListItemIcon><ScoreboardIcon/></ListItemIcon>
								<ListItemText>Login</ListItemText>
							</ListItem>
						}
						{ auth0Client.isAuthenticated() && 
							<ListItem button onClick={() => {signOut()}}>
								<ListItemIcon><ScoreboardIcon/></ListItemIcon>
								<ListItemText>Logout + {auth0Client.getProfile().name}</ListItemText>
							</ListItem>
						}
						
					</List>
				</Drawer>
			</Hidden>	
			
			<div className={classes.content}>
				<div className={classes.toolbar} />
				<Route path="/" exact component={Scoreboard} />
				<SecuredRoute path="/admin" exact component={Admin} />
			</div>
		</div>
	);
}

export default withRouter(App);

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	toolbar: {
		...theme.mixins.toolbar,
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
		// flexGrow: 1,
		width:'100%',
		// padding: theme.spacing(3),
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
