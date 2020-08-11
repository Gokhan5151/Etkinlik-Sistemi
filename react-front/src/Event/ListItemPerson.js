import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

  export default function ListItemPerson(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClick=()=>{
        setOpen(!open)
    }
    const person=props.person;
    return (
        <div>
                        <ListItem button onClick={handleClick}>
                             <ListItemText primary={person.name+" "+person.surname}/>
                             {open ? <ExpandLess /> : <ExpandMore />}
                              </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                   <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                             <ListItemText primary={"TC:"+(person.tc_kimlik||"belirtilmemiş..")} />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                             <ListItemText primary={"Yaş:"+(person.age||"belirtilmemiş..")} />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                             <ListItemText primary={"Ülke:"+(person.country||"belirtilmemiş..")} />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                             <ListItemText primary={"Şehir:"+(person.city||"belirtilmemiş..")} />
                                        </ListItem>
                                  </List>
                                 </Collapse>
                                 <Divider/>
                           
        </div>
    )
}
