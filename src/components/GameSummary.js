import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

// eslint-disable-next-line react/prop-types
const GameSummary = ({ gameData }) => {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} container className={classes.header}>
                <Grid item xs={3}>
                    <Typography variant='button'>Player</Typography>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Typography variant='button'>Faction</Typography>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Typography variant='button'>Points</Typography>
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Typography variant='button'>Win</Typography>
                </Grid>
            </Grid>
            {gameData.gameEntries.map((entry, i) => (
                <Grid item xs={12} container key={i} style={{borderBottom:'solid', borderWidth: 1, borderColor: '#0003', padding:8}}>
                    <Grid item xs={3}>
                        <Typography variant='button'>{entry.userName}</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.gridItem}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                        <img 
                            src={process.env.PUBLIC_URL + 'assets/' + entry.sigilLocation} 
                            style={{width:20, paddingRight:8}} 
                            alt={entry.factionName}
                        />
                        <Typography>{entry.factionName}</Typography>
                    </div>
                    </Grid>
                    <Grid item xs={3} className={classes.gridItem}>
                        <Typography variant='button'>{entry.points}{entry.win && '+(2)'}</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.gridItem}>
                        <Typography variant='button'>{entry.win ? <img src={process.env.PUBLIC_URL + 'assets/throne.PNG'} style={{width:20, paddingRight:8}}/> : ''}</Typography>
                    </Grid>
                </Grid>
            ))}        
        </Grid>
    );
};

export default GameSummary;

const useStyles = makeStyles(theme => ({
    gridItem: {
        textAlign:'center'
    },
    header: {
        marginBottom: 36,
    },
}))