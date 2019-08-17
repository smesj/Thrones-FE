import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const getPlayersFactions = (setPlayers) => {
	axios.get(process.env.REACT_APP_API_URL+'/players/withFactions')
		.then((response) => {
			setPlayers(response.data)
		}).catch ((error) => {
		}).finally(() => {
			return ''
		})
}

const Scoreboard = () => {

	const classes = useStyles();
	const [expandedRow, setExpandedRow] = useState(false)
	const [players, setPlayers] = useState(undefined)

	useEffect(() => {
		getPlayersFactions(setPlayers);
	}, []);
	
	const collapseComponent = (props) => (
		<div className={props.className}>
			{props.children}
		</div>
	)

	if (players === undefined) {
		return (
			<CircularProgress/>
		)
	}

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Thrones 2019 Season 1</Typography>
			<Grid item xs={12}>
				<Table style={{ width: '100%' }}>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableCell} align="left">Player</TableCell>
							<TableCell className={classes.tableCell} align="right">Games Played</TableCell>
							<TableCell className={classes.tableCell} align="right">Total Points</TableCell>
							<TableCell className={classes.tableCell} align="right">Points Per Game</TableCell>
							<TableCell className={classes.tableCell} align="right">Wins</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{players.map((player, i) => (
						<React.Fragment key={i}>
							<TableRow onClick={() => setExpandedRow(expandedRow === player.id ? undefined : player.id)}>
								<TableCell className={classes.tableCell}>
									<div style={{display:'flex', alignItems:'center'}}>
										<img src={player.picture} style={{width: 50, marginRight: 8}}/>
										<Typography>{player.userName}</Typography>
									</div>
								</TableCell>
								<TableCell className={classes.tableCell} align="right">{player.gamesPlayed}</TableCell>
								<TableCell className={classes.tableCell} align="right">{player.totalPoints}</TableCell>
								<TableCell className={classes.tableCell} align="right">{isNaN(player.totalPoints / player.gamesPlayed) ? 0 : (player.totalPoints / player.gamesPlayed).toFixed(2)}</TableCell>
								<TableCell className={classes.tableCell} align="right">{player.wins}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ padding: 0 }} colSpan={5}>
									<Collapse
											in={expandedRow === player.id}
											timeout="auto"
											component={collapseComponent}
											unmountOnExit
									>
										<Grid item xs={12}>
											<Table style={{ width: '100%' }}>
												<TableHead>
													<TableRow>
														<TableCell className={classes.tableCell} align="left">Faction</TableCell>
														<TableCell className={classes.tableCell} align="right">Games Played</TableCell>
														<TableCell className={classes.tableCell} align="right">Total Points</TableCell>
														<TableCell className={classes.tableCell} align="right">Points Per Game</TableCell>
														<TableCell className={classes.tableCell} align="right">Wins</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{player.factionTotals.map((faction, i) => (
														<TableRow key={i}>
															<TableCell className={classes.tableCell}>
																<div style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
																	<img src={process.env.PUBLIC_URL + 'assets/' + faction.sigilLocation} style={{width:20, paddingRight:8}} alt={faction.factionName}/>{faction.factionName}
																</div>
															</TableCell>
															<TableCell className={classes.tableCell} align="right">{faction.gamesPlayed}</TableCell>
															<TableCell className={classes.tableCell} align="right">{faction.totalPoints}</TableCell>
															<TableCell className={classes.tableCell} align="right">{isNaN(faction.totalPoints / faction.gamesPlayed) ? 0 : faction.totalPoints / faction.gamesPlayed}</TableCell>
															<TableCell className={classes.tableCell} align="right">{faction.wins}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</Grid>
									</Collapse>
								</TableCell>
							</TableRow>
						</React.Fragment>
					))}
					</TableBody>
				</Table>
			</Grid>
        </div>
    )
}

export default Scoreboard;


const useStyles = makeStyles(theme => ({
	root: {
	},
	table: {
	},
	tableCell: {
		paddingRight: 4,
		paddingLeft: 5
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	app: {
		padding: 32,
	},
	container: {
		width: '100%',
	}
  }));