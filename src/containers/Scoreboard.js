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

const getPlayersFactions = (setPlayers) => {
	axios.get('http://api.lastdaysofcheese.com:4000/players/withFactions')
		.then((response) => {
			setPlayers(response.data)
		}).catch ((error) => {
			console.log(error)
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
			<div>loading</div>
		)
	}

    return (
        <div className={classes.container}>
            <Typography variant='h2'>Thrones 2019 Season 1</Typography>
			<Grid item xs={12}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Player</TableCell>
							<TableCell align="right">Games Played</TableCell>
							<TableCell align="right">Total Points</TableCell>
							<TableCell align="right">Points Per Game</TableCell>
							<TableCell align="right">Expand</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{players.map((player, i) => (
						<React.Fragment key={i}>
							<TableRow onClick={() => setExpandedRow(expandedRow === player.firstName ? undefined : player.firstName)}>
								<TableCell>
									{player.nickname? player.nickname : player.firstName}
								</TableCell>
								<TableCell align="right">{player.gamesPlayed}</TableCell>
								<TableCell align="right">{player.totalPoints}</TableCell>
								<TableCell align="right">{isNaN(player.totalPoints / player.gamesPlayed) ? 0 : player.totalPoints / player.gamesPlayed}</TableCell>
								<TableCell align="right">+</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ padding: 0 }} colSpan={5}>
									<Collapse
											in={expandedRow === player.firstName}
											timeout="auto"
											component={collapseComponent}
											unmountOnExit
									>
										<Grid item xs={12}>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell align="left">Faction</TableCell>
														<TableCell align="right">Games Played</TableCell>
														<TableCell align="right">Points</TableCell>
														<TableCell align="right">Points Per Game</TableCell>
														<TableCell align="right">Wins</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{player.factionTotals.map((faction, i) => (
														<TableRow key={i}>
															<TableCell>
																<div style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
																	<img src={process.env.PUBLIC_URL + 'assets/' + faction.sigilLocation} style={{width:20, paddingRight:8}} alt={faction.factionName}/>{faction.factionName}
																</div>
															</TableCell>
															<TableCell align="right">{faction.gamesPlayed}</TableCell>
															<TableCell align="right">{faction.totalPoints}</TableCell>
															<TableCell align="right">{isNaN(faction.totalPoints / faction.gamesPlayed) ? 0 : faction.totalPoints / faction.gamesPlayed}</TableCell>
															<TableCell align="right">{faction.wins}</TableCell>
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