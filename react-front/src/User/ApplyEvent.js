import React, { Component } from 'react'
import EventConsumer from '../ContextEvents'
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import Axios from 'axios';
import {w3cwebsocket as W3CWebSocket} from 'websocket'


const Client=new W3CWebSocket("ws://192.168.1.3:8000")

export default class ApplyEvent extends Component {
    footer = (
        <EventConsumer>
               {
                   value=>{
                       return(
                             this.state.quar===undefined?<div><Button label="Başvur" icon="pi pi-check" onClick={this.apply.bind(this,value.dispatch)}/>
                             <Button label="Vazgeç" icon="pi pi-times" onClick={this.onHide.bind(this)} /></div>:<div><Button label="Tamam" icon="pi pi-check" onClick={this.onHide.bind(this)}/></div>
                       )
                   }
               }
        </EventConsumer>
       
    )
   
    async apply(dispatch,e){
      const{TC_kimlik}=this.state;
       
      (Number.isInteger(TC_kimlik-0)&&TC_kimlik===JSON.parse(localStorage.getItem("user")).tc_kimlik)?await Axios.post("http://192.168.1.3:8181/apply?event_id="+this.props.event_id,{tc_kimlik:TC_kimlik})
      .then(res=>{
          console.log(res)
          if(res.data){
         
            dispatch({type:"ADD"})
            Axios.post("/api/sendMail",{TC:TC_kimlik,event_id:this.props.event_id}).then(res=>{
                this.setState({
                    quar:res.data
                })
            });
            Axios.get("http://192.168.1.3:8181/get",{params:{token:localStorage.getItem("Authorization")}}).then(res=>{
                    localStorage.setItem("user",JSON.stringify(res.data))
            });
            Client.send(JSON.stringify({target:"Owner",TC:TC_kimlik,name:JSON.parse(localStorage.getItem("user")).name,surname:JSON.parse(localStorage.getItem("user")).surname}));
          }else{
              alert("Bir hata oluştu! bilgilerini kontrol et...")
          }
      
          
      }):alert("Bir hata oluştu!");

    }
    state={
        TC_kimlik:"",
        quar:undefined
    }
    
    onHide(e){
        this.props.visible();
        this.setState({TC_kimlik:""})
        
        
    }
    render() {
   
               
      
    
     
      
        const visible_dialog=this.props.visible_dialog;
        return (
          <EventConsumer>
              {
                  value=>{
                      
                      return(
                                      <Dialog maximizable={true} header={"Onayla"} footer={this.footer}   visible={visible_dialog} style={{width: '50vw'}} modal={true} onHide={this.onHide.bind(this)}>
                                       {
                                       this.state.quar===undefined?<form>
                                       <h5 style={{color:"gray"}}>Onaylamak için TC kimliğini doğru giriniz!</h5>
                                       <div className="form-group mb-3">
                                           <label htmlFor="TC_kimlik">TC Kimlik</label>
                                           <input maxLength={11} minLength={11} inputMode="numeric" style={{float:"left"}} type="text" value={this.state.TC_kimlik} name="TC"  placeholder="TC" className="form-control" onChange={(e)=>this.setState({TC_kimlik:e.target.value})}></input>
                   
                                       </div></form>:(<img src={this.state.quar} alt="user"/>)
                                   
                                       
                                    
                                       } 
                                      </Dialog>
                      )
                  }
              }
                        
          </EventConsumer>
        )
    }
}
