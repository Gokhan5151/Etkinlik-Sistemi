import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import ListItemPerson from './ListItemPerson';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventPersons(props) {
  const classes = useStyles();
  const handleClose = () => {
      props.close_dialog();
  };
  const event=props.event;
  return (
    <div>
 
     
      <Dialog key={event.id} fullScreen open={props.open_dialog} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Kayıt Olanlar
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Kapat
            </Button>
          </Toolbar>
        </AppBar>
        <List>
              {
             
                 event.persons?
                 event.persons.map(user=>{
                     return(
                             <ListItemPerson key={user.id} person={user}></ListItemPerson>
                     )
                 }):null
             }
    
        </List>
      </Dialog>
    </div>
  );
}
