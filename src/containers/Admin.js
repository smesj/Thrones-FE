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

const player = {
    firstName: '',
    lastName: '',
    nickName: '',
}

const playerGameEntry = {
    id:'',
    points:'',
    factionId: '',
    win: false
}

const addPlayer = (values, actions, setPlayers) => {
    axios.post('http://api.lastdaysofcheese.com/players/',
        values
    )
    .then((response) => {
        getPlayers(setPlayers)
    })
    .catch(function (error) {
    })
    .finally(function () {
        actions.setSubmitting(false);
    });
}

const getPlayers = (setPlayers) => {
    axios.get('http://api.lastdaysofcheese.com/players/')
    .then((response) => {
        setPlayers(response.data);
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}

const getFactions = (setFactions) => {
    axios.get('http://api.lastdaysofcheese.com/factions/')
    .then((response) => {
        setFactions(response.data);
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}

const submitGame = (values, actions) => {
    axios.post('http://api.lastdaysofcheese.com/games/', 
        values
    )
    .then(function (response) {
    })
    .catch(function (error) {
    })
    .finally(function () {
        actions.setSubmitting(false);
    });
}

const addPlayerDia = (setPlayerDialog) => () => {
    setPlayerDialog(true);
}

const getGames = (setGames) => {
    axios.get('http://api.lastdaysofcheese.com/games/')
    .then((response) => {
        setGames(response.data);
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}

const handleClose = (setPlayerDialog) => () => {
    setPlayerDialog(false);
}

const Admin = () => {

    const classes = useStyles();
    const [players, setPlayers] = useState(undefined);
    const [factions, setFactions] = useState(undefined);
    const [playerDialog, setPlayerDialog] = useState(false);
    const [games, setGames] = useState([])

    const playersDropdownData = (players? players.map((player) => {
        return ({
            value: player.id,
            label: player.nickName,
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
            <Dialog open={playerDialog} onClose={handleClose(setPlayerDialog)}>
                <DialogTitle>Add Player</DialogTitle>
                <Formik
                    initialValues={player}
                    onSubmit={(values, actions) => {
                        addPlayer(values, actions, setPlayers)
                        setPlayerDialog(false)
                    }}
                    render={({ errors, status, touched, isSubmitting, values, handleChange, submitForm }) => (
                        <>
                            <DialogContent>
                                <Form style={{display:'flex', flexDirection:'column'}}>
                                    <TextField
                                        label='First Name'
                                        name='firstName'
                                        value={values.firstName}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        label='Last Name'
                                        name='lastName'
                                        value={values.lastName}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        label='Nickname'
                                        name='nickName'
                                        value={values.nickName}
                                        onChange={handleChange}
                                    />
                                </Form>
                            </DialogContent>
                            <DialogActions>                     
                                <Button onClick={handleClose(setPlayerDialog)} color="primary">
                                    Cancel
                                </Button>
                                <Button type='submit' onClick={submitForm} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </>
                    )}
                />
            </Dialog>
            <Button color="primary" variant="outlined" onClick={addPlayerDia(setPlayerDialog)}>Add Player</Button>
            <br />
            <br />
            <br />
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
                                    <TableCell align="left">Player</TableCell>
                                    <TableCell align="left">Faction</TableCell>
                                    <TableCell align="left">Points</TableCell>
                                    <TableCell align="left">Win</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {game.gameEntries.map((entry) => (
                                    <TableRow key={entry.id}>
                                        <TableCell align="left">{entry.nickName}</TableCell>
                                        <TableCell align="left">
                                            <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                                                <img 
                                                    src={process.env.PUBLIC_URL + 'assets/' + entry.sigilLocation} 
                                                    style={{width:20, paddingRight:8}} 
                                                    alt={entry.factionName}
                                                />
                                                <Typography>{entry.factionName}</Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">{entry.points}</TableCell>
                                        <TableCell align="left">{entry.win ? <img src={process.env.PUBLIC_URL + 'assets/throne.PNG'} style={{width:20, paddingRight:8}}/> : ''}</TableCell>
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
                            submitGame(values, actions)
                            actions.setSubmitting(false);
                        }}
                        render={({ errors, status, touched, isSubmitting, values, handleChange }) => (
                            <Form>                              
                                <FieldArray
                                    name='players'
                                    render={arrayHelpers => (
                                        <div style={{width:'100%'}}>
                                            {values.players.map((player, i) => (
                                                <div key={i} style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end'}}>
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

}))