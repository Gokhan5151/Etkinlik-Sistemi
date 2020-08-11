import React, { Component } from 'react'
import AddEvent from "../Event/AddEvent"
import {TabMenu} from 'primereact/tabmenu';
import List from "../Event/List"
import {BrowserRouter as Router, Route} from "react-router-dom";
import EventChart from '../Charts/EventChart';
import Notification from 'react-web-notification'

import {w3cwebsocket as W3CWebSocket} from 'websocket'
import Axios from 'axios';

  const logged=async ()=>{
    if(localStorage.getItem("Authorization")===null||localStorage.getItem("Authorization")===undefined)
     window.location.href="/login";
    await Axios.get("http://192.168.1.3:8181/get",{params:{token:localStorage.getItem("Authorization")}}).then(res=>{
      if(res.data.authorities.find(e=>e.authority==="WRITE")===undefined)
       window.location.href="user"
       
  
  
    })
  }
const Client=new W3CWebSocket("ws://192.168.1.3:8000")
class Owner extends Component {
    
    state={
        items: [
            {label: 'Anasayfa', icon: 'pi pi-fw pi-home'},
            {label: 'Etkinlik Ekle', url:"/owner/addevent",icon: 'pi pi-fw pi-calendar'},
            {label: 'Etkinlik Rapor', url:"/owner/rapor",icon: 'pi pi-fw pi-pencil'},
            {label:  "Etkinlikler",url:"/owner/events", icon: 'pi pi-fw pi-file'},
            {label: 'Çıkış Yap', icon: 'pi pi-fw pi-cog'}
        ],
        activeItem:{label: 'Etkinlikler',url:"/owner/events", icon: 'pi pi-fw pi-file'},
        socket_data:undefined
      
    
        
    }
    constructor(){
      super();
      logged();
    }
    logout(){
      localStorage.clear();
      window.location.href="/login";
    }
     componentDidMount(){
     
      Client.onopen=function(){
        console.log("Hello")
      }
      Client.onmessage=function(e){
        if(JSON.parse(e.data).target==="Owner")
         this.setState({socket_data:JSON.parse(e.data)})
      }.bind(this)
     
     }
  
     setNotification(){

       
       let socket_data=this.state.socket_data;
       return(<Notification 
        title={"Yeni başvuru"}
        onPermissionDenied={()=>{console.log("denied")}}
        askAgain={true}
        timeout={5000}
        options={
          {
           body:"TC kimlik:"+socket_data.TC+"\n"+
           "Ad:"+socket_data.name+"\n"+
           "Soyad:"+socket_data.surname
          }
        }
        onClose={this.setState({socket_data:undefined})}/>)
     }
    render() {
      window.Notification.requestPermission().then(function (permission) {
        console.log(permission)
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
      const {socket_data,activeItem,items}=this.state;
        return (
                            <div>
                             
                               <TabMenu model={items} activeItem={activeItem} onTabChange={(e) => this.setState({activeItem: e.value})}/>
                                <Router>
                                 <Route path="/owner/events">
                                  <List></List>
                                </Route>
                               <Route path="/owner/addevent">
                                  <AddEvent></AddEvent>
                               </Route>
                               <Route path="/owner/rapor">
                                  <EventChart></EventChart>
                               </Route>
                               </Router>
                               {
                                   activeItem.label==="Çıkış Yap"?this.logout():null
                                 }  
                               {
                                 socket_data!==undefined?this.setNotification():null
                               }
                                    
                            </div>
                          )
                    
    }
}
export default Owner;