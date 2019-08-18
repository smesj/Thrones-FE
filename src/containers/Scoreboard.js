import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayerScore from '../components/PlayerScore';

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
	const [players, setPlayers] = useState(undefined)

	useEffect(() => {
		getPlayersFactions(setPlayers);
	}, []);
	
	if (players === undefined) {
		return (
			<CircularProgress/>
		)
	}

    return (
        <div className={classes.container}>
			<PlayerScore players={players}/>
        </div>
    )
}

export default Scoreboard;

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
	}
  }));