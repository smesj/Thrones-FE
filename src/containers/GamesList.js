import React, { useState, useEffect } from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

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

const GamesList = () => {

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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell} align="left">Player</TableCell>
                                <TableCell className={classes.tableCell} align="left">Faction</TableCell>
                                <TableCell className={classes.tableCell} align="left">Points</TableCell>
                                <TableCell className={classes.tableCell} align="left">Win</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {game.gameEntries.map((entry, i) => (
                                <TableRow key={i}>
                                    <TableCell className={classes.tableCell} align="left">{entry.userName}</TableCell>
                                    <TableCell className={classes.tableCell} align="left">
                                        <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                                            <img 
                                                src={process.env.PUBLIC_URL + 'assets/' + entry.sigilLocation} 
                                                style={{width:20, paddingRight:8}} 
                                                alt={entry.factionName}
                                            />
                                            <Typography>{entry.factionName}</Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.tableCell} align="left">{entry.points}</TableCell>
                                    <TableCell className={classes.tableCell} align="left">{entry.win ? <img src={process.env.PUBLIC_URL + 'assets/throne.PNG'} style={{width:20, paddingRight:8}}/> : ''}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ExpansionPanelDetails>
            </ExpansionPanel>           
        ))}
    </>
  );
};

export default GamesList;

const useStyles = makeStyles(theme => ({
    tableCell: {
		paddingRight: 4,
		paddingLeft: 5
	},
}))