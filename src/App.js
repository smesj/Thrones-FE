import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink, Route, BrowserRouter } from 'react-router-dom'
import Scoreboard from './containers/Scoreboard';
import Admin from './containers/Admin'
import ScoreboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

// eslint-disable-next-line react/display-name
const NavRef = React.forwardRef((props, ref) => <div ref={ref}><NavLink {...props}/></div>);

function App() {

	const classes = useStyles();

	const [mobileOpen, setMobileOpen] = React.useState(false);

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
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
					<img src={process.env.PUBLIC_URL + 'assets/throne.PNG'} style={{width:50, paddingRight:8}} alt='throne'/>
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
						{/* <div className={classes.toolbar} /> */}
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
						</List>
					</Drawer>
				</Hidden>	
				
				<div className={classes.content}>
					<div className={classes.toolbar} />
					<Route path="/" exact component={Scoreboard} />
					<Route path="/admin" exact component={Admin} />
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
