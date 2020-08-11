import React, { Component } from 'react'
import Axios from 'axios';
import EventConsumer from '../ContextEvents';


export default class LoginForm extends Component {
    state={
        password:"",
        username:"",
    }
    handlerChange(e){
      
       this.setState({[e.target.name]:e.target.value});
    }
    async onSubmitHandler(e){
        Axios.defaults.headers["Authorization"]="";
       e.preventDefault();
       
        await Axios.post("http://192.168.1.3:8181/login",{
            username:this.state.username,
            password:this.state.password
        }).then(res=>{
          if(res.data){
            localStorage.setItem("Authorization",res.data.token);
            Axios.defaults.headers["Authorization"]="Bearer ".concat(res.data.token);
          }

        
          return this.login_control(res.data.token);
        })
        
        
    }
    login_control(token){
        
        console.log('Bearer '.concat(token))
        Axios.get("http://192.168.1.3:8181/control").then(result=>{
            if(result.data===1){
            
                   Axios.get("http://192.168.1.3:8181/get",{params:{token:localStorage.getItem("Authorization")}}).then(res=>{
                    console.log(res)
                   if(res.data){
                    localStorage.setItem("user",JSON.stringify(res.data))
                 
                   if(res.data.authorities.find(e=>e.authority==="WRITE"))
                       window.location.href="/owner"
                       else if(res.data.authorities.find(e=>e.authority==="TRAINER"))
                       window.location.href="/event/"+res.data.trainer_event.id
                       else
                       window.location.href="/user"
                   }
                    })
            }else{
                alert("Şifre veya Kullanıcı adı yanlış!")
            }
            
        })
    }
    
    render() {
        return (
            <EventConsumer>
                {
                    value=>{
                        
                        return(
                            <div>
                            <form onSubmit={this.onSubmitHandler.bind(this)}  className="was-validated">
                                <div className="form-group">
                                   <label htmlFor="username">Username</label>
                                   <input type="text" id="usern" name="username"  className="form-control" placeholder="Kullanıcı adı"  onChange={this.handlerChange.bind(this)} required></input>
                                   <div className="valid-feedback">Uygun</div>
                                   <div className="invalid-feedback">Boş geçemezsin!</div>
                                </div>
                                <div className="form-group">
                                   <label htmlFor="pass">Password</label>
                                   <input type="password" id="pass" name="password" className="form-control" placeholder="Password"  onChange={this.handlerChange.bind(this)} required></input>
                                   <div className="valid-feedback">Uygun</div>
                                   <div className="invalid-feedback">Boş geçemezsin!</div>
                                </div>
                                <button type="submit"   className="btn btn-primary float-right">Giriş Yap</button>
                            </form>
                           
                          
                        </div>
                        )
                    }
                }
            
            </EventConsumer>
           
        )
    }
}
