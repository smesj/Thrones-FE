import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

// eslint-disable-next-line react/prop-types
const PlayerFactionSummary = ({ factionData }) => {

    const classes = useStyles();

    const filteredFactionData = factionData.filter((faction) => faction.gamesPlayed !== 0)

    return (
        <Grid 
            container 
            alignItems='center'
            justify='space-between'
        >
            <Grid item xs={12} container>
                <Grid item xs={3} className={classes.gridItem}>
                    <Typography variant="button">Faction</Typography>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <Typography variant="button">G.P.</Typography>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <Typography variant="button">P.P.G.</Typography>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <Typography variant="button">P</Typography>
                </Grid>
                <Grid item xs={2} className={classes.gridItem}>
                    <Typography variant="button">W</Typography>
                </Grid>
            </Grid>
            {filteredFactionData.map((faction, i) => (
                <Grid item xs={12} container key={i}>
                    <Grid item xs={3} className={classes.gridItem}>
                        <div style={{display:'flex',flexDirection:'row',alignContent:'center'}}>
                            <img src={process.env.PUBLIC_URL + 'assets/' + faction.sigilLocation} style={{width:20, paddingRight:8}} alt={faction.factionName}/>
                            <Typography>{faction.factionName}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={2} className={classes.gridItem}>
                        <Typography>{faction.gamesPlayed}</Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.gridItem}>
                        <Typography>{faction.totalPoints}</Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.gridItem}>
                        <Typography>{isNaN(faction.totalPoints / faction.gamesPlayed) ? 0 : faction.totalPoints / faction.gamesPlayed}</Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.gridItem}>
                        <Typography>{faction.wins}</Typography>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default PlayerFactionSummary;

const useStyles = makeStyles(theme => ({
    gridItem: {
        textAlign:'center'
    },
}))