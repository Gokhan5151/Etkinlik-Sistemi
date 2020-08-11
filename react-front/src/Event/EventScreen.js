import React, { Component } from 'react'
import LetterAvatar from './EventScreenPersons'
import CardTrainer from './CardTrainer';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import DirectionsIcon from '@material-ui/icons/Directions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Axios from 'axios'
const useStyles = makeStyles((theme) => ({
 
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "%100",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const client=new W3CWebSocket("ws://192.168.1.3:8000")
function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    props.selected_user(event.target.value);
    setUser(event.target.value);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
    
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Send Username</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={user}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Seçilmemiş</em>
          </MenuItem>
          {
            props.persons.map(person=>{
              return <MenuItem key={person.id} value={person}>{person.username+" "+person.name}</MenuItem>
            })
          }
          
         
        </Select>
      </FormControl>
    </div>
  );
}

function CustomizedInputBase(props) {
  const classes = useStyles();
  const [message,setMessage]=React.useState("")
  const handleSendMessage=(e)=>{
  
    if(JSON.parse(localStorage.getItem("user")).authorities.find(auth=>auth.authority==="TRAINER")!==undefined){
      if(props.send_user!==undefined){
        client.send(JSON.stringify({
          user:props.send_user,
          auth:"trainer",
          target:"EventScreen",
          message:message,
          date:new Date(Date.now()),
          event_id:props.event.id,
      }))
      }else
      alert("Lütfen gönderilecek kullanıcı seçiniz...")

    }else{
      client.send(JSON.stringify({
        user:JSON.parse(localStorage.getItem("user")),
        to:props.event.trainer,
        auth:"user",
        target:"EventScreen",
        message:message,
        date:new Date(Date.now()),
        event_id:props.event.id

    }))
  }
  setMessage("");
  }
  return (
    <Paper  component="form" className={classes.root}>
    
      <InputBase
        className={classes.input}
        placeholder="Mesaj"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton title="Gönder" color="primary" onClick={handleSendMessage}className={classes.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );

}

export default class EventScreen extends Component {
  
    state={
        event:undefined,
        message:undefined,
        messages:[],
        selected_user:undefined


    }
    constructor(){
      super()
      if(JSON.parse(localStorage.getItem("user")).authorities.find(auth=>(auth.authority==="TRAINER"))!==undefined&&JSON.parse(localStorage.getItem("user")).authorities.find(auth=>(auth.authority==="WRITE"))===undefined)
       Axios.get("http://192.168.1.3:8181/get",{params:{token:localStorage.getItem("Authorization")}}).then(res=>{
            localStorage.setItem("user",JSON.stringify(res.data))
            this.setState({event:JSON.parse(localStorage.getItem("user")).trainer_event})
          });
      
    }
    componentDidMount(){
        if(JSON.parse(localStorage.getItem("user")).authorities.find(auth=>(auth.authority==="TRAINER"))!==undefined&&JSON.parse(localStorage.getItem("user")).authorities.find(auth=>(auth.authority==="WRITE"))===undefined){
            this.setState({event:JSON.parse(localStorage.getItem("user")).trainer_event})
        }else{
            this.setState({event:this.props.event})
        }
        client.onopen=()=>{
            console.log("Connection is open...")
        }
        client.onmessage=(e)=>{
          if(JSON.parse(e.data).target==="EventScreen"){
            console.log(JSON.parse(e.data))
            if((JSON.parse(e.data).user.tc_kimlik===JSON.parse(localStorage.getItem("user")).tc_kimlik&&JSON.parse(e.data).event_id===this.state.event.id)||(JSON.parse(localStorage.getItem("user")).authorities.find(auth=>(auth.authority==="TRAINER"))!==undefined&&JSON.parse(e.data).event_id===this.state.event.id)){
              
              this.setState({messages:[...this.state.messages,{user:JSON.parse(e.data).user,auth:JSON.parse(e.data).auth,message:JSON.parse(e.data).message,date:JSON.parse(e.data).date}]})
             
             }
             var scroll=document.getElementById("message_screen");
             scroll.scrollTop=scroll.scrollHeight;
          }
        }

    }
    render() {
      
        return (
            
                this.state.event!==undefined?  <div className="container-fluid" style={{paddingBottom:"10px"}}>
                 
                <div className="container-fluid "  style={{backgroundColor:"gray",overflow:"hidden",color:"white",padding:"10px",background:'linear-gradient(0deg, gray 30%, black 90%)'}}>
                     <CardTrainer event={this.state.event}/>
                     <div className="container-fluid" style={{float:"left",textAlign:"center",width:"80%",backgroundColor:"gray",borderTopLeftRadius:'23px'}}> 
                       <h3>{this.state.event.event_name}</h3>
                       <Divider/>
                       <MeetingRoomIcon style={{float:"right",cursor:'pointer'}} onClick={(e)=>{window.location.href="/user"}}/>
                    </div>
                   </div>
                   <div className="container-fluid" style={{height:"500px",margin:10}}>
                       <div  style={{width:"68%",backgroundColor:"white",opacity:"80%",height:"500px",float:"left"}}>
                        </div>
        
                        <div style={{width:"30%",position:'relative',background:'linear-gradient(0deg, gray 0%, white 15%)',backgroundColor:"white",borderRadius:10,height:"500px",float:"left",marginLeft:"2%"}}>
                            <div id="message_screen" style={{height:"80%",overflowY:'scroll'}}>
                             {
                               this.state.messages.map(message=>{
                               return(<div key={new Date(message.date).getTime()} style={{padding:5,maxWidth:"100%"}}><h3>{message.auth==="user"?message.user.name:this.state.event.trainer.name}</h3><span style={{fontSize:13}}>{new Date(message.date).toLocaleString("tr-TR")}</span><Divider/><p>{message.message}</p></div>)
                               })
                             }
                            </div>
                           
  
                            <div style={{position:'absolute',bottom:0,width:"100%"}}>
                                  {
                                   JSON.parse(localStorage.getItem("user")).authorities.find(auth=>auth.authority==="TRAINER")!==undefined
                                   ?<ControlledOpenSelect selected_user={(user)=>this.setState({selected_user:user})} persons={this.state.event.persons}/>
                                   :null
                                  }
                                 <CustomizedInputBase send_user={this.state.selected_user} event={this.state.event}/>
                            </div>
                        </div>
                           
                   </div>
                   <div className="container-fluid" style={{backgroundColor:"gray",textAlign:"center",color:"white",padding:"10px",overflowY:'auto'}}>
                     <h3>Katılımcılar</h3>
                     <Divider/>
                     <LetterAvatar persons={this.state.event.persons}/>
                   </div>
                 
                

            </div>:null
            
          
        )
    }
}
