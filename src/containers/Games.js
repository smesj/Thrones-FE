import React, { useState, useEffect } from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GameSummary from "../components/GameSummary";

const getGames = (setGames) => {
    axios.get(process.env.REACT_APP_API_URL+'/games/')
    .then((response) => {
        setGames(response.data);
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}

const Games = () => {

    const classes = useStyles();
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames(setGames);
    }, []);

  return (
    <>
        {games && games.map((game) => (
            <ExpansionPanel key={game.id}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>{moment(new Date(parseInt(game.date))).format("MMMM Do YYYY").toString()}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <GameSummary gameData={game} />
                </ExpansionPanelDetails>
            </ExpansionPanel>           
        ))}
    </>
  );
};

export default Games;

const useStyles = makeStyles(theme => ({
    tableCell: {
		paddingRight: 4,
		paddingLeft: 5
	},
}))