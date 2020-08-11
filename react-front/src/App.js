import React from 'react';
import './App.css';
import {Component} from "react";
import { ProviderMenu } from './ContextEvents';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Owner from './Controller/Owner';
import Login from "./Security/Login"
import Axios from 'axios';
import UserManagement from './Controller/UserManagement';
import EventScreen from './Event/EventScreen';




class App extends Component{
  logged=async ()=>{
    if(localStorage.getItem("Authorization")===null||localStorage.getItem("Authorization")===undefined)
     window.location.href="/login";
    await Axios.get("http://192.168.1.3:8181/get",{params:{token:localStorage.getItem("Authorization")}}).then(res=>{
      if(res.data.authorities.find(e=>e.authority==="WRITE")===undefined)
       this.setState({loggin:"user"})
      else
       this.setState({loggin:"admin"})
  
  
    })
  }
  constructor(){
    super();   
        
    if(localStorage.getItem("Authorization")!==null||localStorage.getItem("Authorization")!==undefined)
      Axios.defaults.headers["Authorization"]="Bearer "+localStorage.getItem("Authorization")
    console.log(localStorage.getItem("Authorization"))
    
     
  }

render(){
  
  
  console.log(JSON.parse(localStorage.getItem("user")))
  return (
    
     <div className="App pt-2 pl-2 pr-2">
  
       <ProviderMenu>
        <Router>
           
          <Route path="/" exact component={Login}/>
          <Route path="/owner"><Owner></Owner></Route>
          <Route path="/user"><UserManagement/></Route>
          <Route path="/login" component={Login}></Route>
          {
            JSON.parse(localStorage.getItem("user"))!==null?JSON.parse(localStorage.getItem("user")).trainer_event!==null?<Route path={"/event/"+JSON.parse(localStorage.getItem("user")).trainer_event.id} component={Login}><EventScreen></EventScreen></Route>:null:null

          }       
          {
             JSON.parse(localStorage.getItem("user"))!==null?JSON.parse(localStorage.getItem("user")).events.map(event=>{
               if(Date.now()>new Date(event.event_start_date).getTime()){
                 return (<Route path={"/event/"+event.id}><EventScreen key={event.id} event={event}></EventScreen></Route>)
               }else{
                 return null;
               }
             }):null
            
          }
          
        </Router>
       
       </ProviderMenu>
      
    </div>

  
  );
}
}


export default App;
