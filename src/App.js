import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Players from './players.js';

function App() {

	const classes = useStyles();

	return (
		<div className={classes.app}>
			<Typography variant='h2'>Thrones Bitch 2019 Season V2</Typography>
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
					<TableRow>
						<TableCell align="left">Player</TableCell>
						<TableCell align="center">Factions</TableCell>
						<TableCell align="right">Games Played</TableCell>
						<TableCell align="right">Total Points</TableCell>
						<TableCell align="right">Points Per Game</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{Players.map((player, i) => (
						<TableRow key={player.firstName}>
						<TableCell component="th" scope="row">
							{player.firstName}
						</TableCell>
						<TableCell align="center">
						<ExpansionPanel>
							<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							>
								<Typography className={classes.heading}>Faction stats</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Faction</TableCell>
											<TableCell>Games Played</TableCell>
											<TableCell>Points</TableCell>
											<TableCell>Wins</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
									{player.factions.map((faction, i) => (
									<TableRow key={i}>
											<TableCell>{faction.faction}</TableCell>
											<TableCell>{faction.gamesPlayed}</TableCell>
											<TableCell>{faction.points}</TableCell>
											<TableCell>{faction.wins}</TableCell>
										</TableRow>
										))}
									</TableBody>
								</Table>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						</TableCell>
						<TableCell align="right">{player.gamesPlayed}</TableCell>
						<TableCell align="right">{player.totalPoints}</TableCell>
						<TableCell align="right">{isNaN(player.totalPoints / player.gamesPlayed) ? 0 : player.totalPoints / player.gamesPlayed}</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
}

export default App;

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto',
	},
	table: {
		minWidth: 650,
	},
	// root: {
	// 	width: '100%',
	// },
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	app: {
		padding: 32,
	}
  }));
