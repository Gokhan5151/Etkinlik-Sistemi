import React from 'react';
import Avatar from '@material-ui/core/Avatar';



export default function LetterAvatars(props) {

  return (
    props.persons!==undefined?<div style={{marginTop:10,padding:5,overflowX:'scroll'}}>
     {
         props.persons.map(person=>{
         return(<Avatar style={{float:"left",marginLeft:5}} title={person.name + " " + person.surname}
           key={person.id}>{person.name[0].toUpperCase()}</Avatar>)
         })
     }
  
    </div>:null
  );
}
