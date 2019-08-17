import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const playerGameEntry = {
    id:'',
    points:'',
    factionId: '',
    win: false
}

const getPlayers = (setPlayers) => {
    axios.get(process.env.REACT_APP_API_URL+'/players/')
    .then((response) => {
        setPlayers(response.data);
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}

const getFactions = (setFactions) => {
    axios.get(process.env.REACT_APP_API_URL+'/factions/')
    .then((response) => {
        setFactions(response.data);
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}

const submitGame = (values, actions, setGames) => {
    axios.post(process.env.REACT_APP_API_URL+'/games/', 
        values
    )
    .then(function (response) {
        getGames(setGames);
    })
    .catch(function (error) {
    })
    .finally(function () {
        actions.setSubmitting(false);
    });
}

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

const Admin = () => {

    const classes = useStyles();
    const [players, setPlayers] = useState(undefined);
    const [factions, setFactions] = useState(undefined);
    const [games, setGames] = useState([])

    const playersDropdownData = (players? players.map((player) => {
        return ({
            value: player.id,
            label: player.userName,
        })
    }) : []);

    const factionsDropdownData = (factions? factions.map((faction) => {
        return ({
            value: faction.id,
            label: faction.factionName,
        })
    }) : []);

    useEffect(() => {
        getPlayers(setPlayers);
        getFactions(setFactions)
        getGames(setGames);
    }, []);
    
    return (
        <div>
            <Typography variant='h5'>Registered Players</Typography>
            <br/>
            {players && players.map((player, i) => {
                if (player.firstName !== null && player.lastName !== null) {
                    return (
                        <Typography key={i}>{player.firstName}, {player.lastName}</Typography>
                    )
                } else {
                    return (
                        <Typography key={i}>{player.userName}</Typography>
                    )
                }
            })}
            <br />
            <br />
            <Typography variant='h5'>Previous Games</Typography>
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
                                        <TableCell className={classes.tableCell} align="left">{entry.nickName}</TableCell>
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
            <br />
            <br />
            <br />
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant='h6'>Submit new game record</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Formik
                        initialValues={{players: [playerGameEntry]}}
                        onSubmit={(values, actions) => {
                            submitGame(values, actions, setGames)
                            actions.setSubmitting(false);
                        }}
                        render={({ errors, status, touched, isSubmitting, values, handleChange }) => (
                            <Form>                              
                                <FieldArray
                                    name='players'
                                    render={arrayHelpers => (
                                        <div style={{width:'100%'}}>
                                            {values.players.map((player, i) => (
                                                <div key={i} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end', flexWrap: 'wrap'}}>
                                                    <div style={{width:200, padding:8, paddingBottom: 12}}>
                                                        <label>
                                                            <Typography>Player</Typography>
                                                            <Field 
                                                                name={`players.${i}.id`}
                                                                component={({field, form}) =>
                                                                    <Select
                                                                        isMulti={false}
                                                                        options={playersDropdownData}
                                                                        autosize={true}
                                                                        value={playersDropdownData.find(player => player.value === field.value)}
                                                                        onChange={(option) => form.setFieldValue(field.name, option.value)}
                                                                        formatOptionLabel={({label}) => (
                                                                            <Typography>{label}</Typography>
                                                                        )}
                                                                    />
                                                                } 
                                                                
                                                            />
                                                        </label>
                                                    </div>
                                                    <div style={{width:200, padding:8, paddingBottom: 12}}>
                                                        <label>
                                                            <Typography>Faction</Typography>
                                                            <Field 
                                                                name={`players.${i}.factionId`}
                                                                component={({field, form}) =>
                                                                    <Select
                                                                        isMulti={false}
                                                                        options={factionsDropdownData}
                                                                        autosize={true}
                                                                        value={factionsDropdownData.find(faction => faction.value === field.value)}
                                                                        onChange={(option) => form.setFieldValue(field.name, option.value)}
                                                                        formatOptionLabel={({label}) => (
                                                                            <Typography>{label}</Typography>
                                                                        )}
                                                                    />
                                                                } 
                                                                
                                                            />
                                                        </label>
                                                    </div>
                                                    <div style={{padding: 8}}>
                                                        <TextField
                                                            label='Points'
                                                            name={`players.${i}.points`}
                                                            value={player.points}
                                                            onChange={handleChange}
                                                            variant="outlined"
                                                            margin='dense'
                                                        />
                                                    </div>
                                                    <div style={{padding:8}}>
                                                        <FormControlLabel
                                                            control={
                                                            <Checkbox
                                                                onChange={handleChange}
                                                                value={player.win}
                                                            />
                                                            }
                                                            label="Win"
                                                            name={`players.${i}.win`}
                                                        />
                                                    </div>
                                                    <div style={{padding:8}}>
                                                        <IconButton aria-label="delete" onClick={() => arrayHelpers.remove(i)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{width:'100%'}}>
                                                <Button color="primary" disabled={isSubmitting} onClick={()=> arrayHelpers.push(playerGameEntry)}>
                                                    Add Player
                                                </Button>                                  
                                            </div>
                                            <div style={{float:'right'}}>
                                                <Button  type='submit' color="primary" disabled={isSubmitting}>
                                                    Submit
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Form>
                        )}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>         
        </div>
    )
}

export default Admin;

const useStyles = makeStyles(theme => ({
    tableCell: {
		paddingRight: 4,
		paddingLeft: 5
	},
}))