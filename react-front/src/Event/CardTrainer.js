import React from 'react'
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function CardTrainer(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            float:"left",
            width:"auto",
        },
        details: {
            
        },
        content: {
            
        
        },

      }));
      const classes = useStyles();
    return (
        <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Eğitmen
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.event.trainer.name+" "+props.event.trainer.surname}
            </Typography>
         
          </CardContent>
        </div>
      </Card>
    )
}

export default CardTrainer
