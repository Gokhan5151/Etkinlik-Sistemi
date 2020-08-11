import React, { Component } from 'react'
import LoginForm from './LoginForm'
import Axios from 'axios'

const logged=async ()=>{
   
    await Axios.get("http://192.168.1.3:8181/get",{params:{token:localStorage.getItem("Authorization")}}).then(res=>{
    if(res.data)
      if(res.data.authorities.find(e=>e.authority==="WRITE")===undefined)
       window.location.href="user"
       else
       window.location.href="owner"
      
  
  
    })
  }
export default class Login extends Component {
 
    
    render() {
        logged();
        return (
            
            <div className="container" style={{height:"500px"}}>
                <div className="jumbotron">
                  <h1>Etkinlik Sistemi</h1>
                  <p>Lütfen Giriş Yapınız...</p>
                   <LoginForm></LoginForm>
               </div>
            </div>
        )
    }
}
