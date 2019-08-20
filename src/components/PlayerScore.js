import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayerFactionSummary from '../components/PlayerFactionSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';

// eslint-disable-next-line react/prop-types
const PlayerScore = ({ players }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>         
            <Grid 
                container
                alignItems='center'
                justify='space-between'
            >          
                <div style={{width:'100%'}}>
                    <ExpansionPanelSummary
                        expandIcon={<div style={{width:24}}/>}
                    >
                    <div className={classes.playerSummaryContainer}>
                        <div  className={classes.picture}/>
                        <Grid item xs={12} container className={classes.pointsRow} style={{marginLeft: 8}}>
                            <Grid item xs={3} className={classes.gridItem}>
                                <Typography variant="button">P.P.G</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.gridItem}>
                                <Typography variant="button">P</Typography> 
                            </Grid>
                            <Grid item xs={3} className={classes.gridItem}>
                                <Typography variant="button">G.P.</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.gridItem}>
                                <Typography variant="button">W</Typography>
                            </Grid>
                        </Grid> 
                    </div>
                    </ExpansionPanelSummary>  
                </div>           
                <div className={classes.playerEntryContainer}>        
                {players.map((player, i) =>(
                    <ExpansionPanel key={i}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>{i+1}</Typography>
                            <div className={classes.playerSummaryContainer} key={i}>
                                <img src={player.picture} className={classes.picture}/>
                                <Grid container>
                                    <Grid container item xs={12}>
                                        <Grid item xs={12}>
                                            <Typography variant='subtitle2'>{player.userName}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} className={classes.pointsRow}>
                                        <Grid item xs={3} className={classes.gridItem}>
                                            <Typography variant='button'>{isNaN(player.totalPoints / player.gamesPlayed) ? 0 : (player.totalPoints / player.gamesPlayed).toFixed(2)}</Typography>
                                        </Grid>
                                        <Grid item xs={3} className={classes.gridItem}>
                                            <Typography variant='button'>{player.totalPoints}</Typography>
                                        </Grid>
                                        <Grid item xs={3} className={classes.gridItem}>
                                            <Typography variant='button'>{player.gamesPlayed}</Typography>
                                        </Grid>
                                        <Grid item xs={3} className={classes.gridItem}>
                                            <Typography variant='button'>{player.wins}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <PlayerFactionSummary factionData={player.factionTotals} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>  
                ))}
                </div>
            </Grid>  
            <Hidden smDown>
                <div style={{width: '20%'}}/>
            </Hidden>
        </div>
    )

}

export default PlayerScore;

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
    },
    header: {
        marginBottom: 36,
    },
    gridItem: {
        textAlign:'center'
    },
    picture: {
        minWidth: 50,
        width: 50, 
        marginRight: 8,
        borderRadius: '50%',
    },
    playerSummaryContainer: {
        display:'flex', 
        width:'100%',
    },
    playerEntryContainer: {
        display:"flex", 
        flexDirection:'column', 
        width:'100%'
    },
    pointsRow: {
        border:'solid', 
        borderWidth: 1, 
        borderRadius: 4, 
        borderColor: '#0003',
        backgroundColor: 'white',
    }
}))