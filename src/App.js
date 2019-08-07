import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink, Route, BrowserRouter } from 'react-router-dom'
import Scoreboard from './containers/Scoreboard.js';
import ScoreboardIcon from '@material-ui/icons/Dashboard';

// eslint-disable-next-line react/display-name
const NavRef = React.forwardRef((props, ref) => <div ref={ref}><NavLink {...props}/></div>);

function App() {

	const classes = useStyles();

	return (
		<div className={classes.app}>
			<BrowserRouter>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
					<img src={process.env.PUBLIC_URL + 'assets/throne.PNG'} style={{width:50, paddingRight:8}} alt='throne'/>
					<Typography variant="h6" noWrap>
						Thrones 2019
					</Typography>
					</Toolbar>
				</AppBar>		
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
					</List>
				</Drawer>
				<div className={classes.content}>
					<div className={classes.toolbar} />
					<Route path="/" exact component={Scoreboard} />
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
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	app: {
		display: 'flex',
	}
  }));
