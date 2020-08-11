import React, { Component } from 'react'
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import Axios from 'axios';
import EventConsumer from '../ContextEvents';
export default class UpdateEvent extends Component {
    footer = (
        <EventConsumer>
               {
                   value=>{
                       return(
                        <div>
                        <Button label="Güncelle" icon="pi pi-check" onClick={this.update_button_handler.bind(this,value.dispatch,value.updated_data)}/>
                        <Button label="Vazgeç" icon="pi pi-times" onClick={this.onHide.bind(this)} />
                       </div>
                       )
                   }
               }
        </EventConsumer>
       
    )
  
  
    async update_button_handler(dispatch,data_change,e){
      const {event,start_date,finish_date}=this.state;
      var event_name=event===""||event===undefined?data_change.event_name:event;
      var event_start_date=start_date===0?new Date(data_change.event_start_date):new Date(start_date);
      var event_last_date=finish_date===0?new Date(data_change.event_last_date):new Date(finish_date);
      
      
      let data={...data_change,event_name,event_start_date,event_last_date}
      console.log(data);
      await Axios.put("http://192.168.1.3:8181/update",data).then(result=>{
          if(result.data){
            dispatch({type:"UPDATE",payload:data})
            this.props.update();
          }else{
              console.log("Bir hata oluştu...");
          }
      });
    
      
    }
  
 
    state={
        event:this.data,
        start_date:0,
        finish_date:0,
     
       }
    onHide(e){
      this.props.update();
    }
   

    
 
    render() {
        
        const visible_update=this.props.visible_update;
        
       
        return (
               <EventConsumer>
                   {
                       value=>{
                        console.log(value.updated_data);
                                       const {updated_data}=value;
                
                                       let fdate;
                                       let sdate;
                                       if(updated_data!==undefined){
                                        fdate=new Date(updated_data.event_last_date);
                                        sdate=new Date(updated_data.event_start_date);
                                       }
                                     
                                       return(
                                        <Dialog maximizable={true} header={updated_data.event_name} footer={this.footer}   visible={visible_update} style={{width: '50vw'}} modal={true} onHide={this.onHide.bind(this)}>
                                        <form>
                                            <div className="form-group mb-5">
                                                <label htmlFor="name">Etkinlik</label>
                                                <input style={{float:"left"}} type="text" value={this.state.event_name} name="name" id="id" placeholder="Etkinlik" className="form-control" onChange={(e)=>this.setState({event:e.value})} required></input>
                        
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="start_date">Başlangıç Tarihi</label>
                                                <Calendar  inline={false} maxDate={this.state.start_date===0?new Date(updated_data.event_last_date):this.state.finish_date} minDate={new Date(Date.now())} value={sdate} onChange={(e) => this.setState({start_date: e.target.value})}></Calendar>
                        
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="finish_date">Bitiş Tarihi</label>
                                                <Calendar inline={false} minDate={(this.state.start_date?new Date(updated_data.event_start_date):this.state.start_date)?this.state.start_date:new Date(Date.now())}  value={fdate} onChange={(e) => this.setState({finish_date: e.target.value})}></Calendar>
                        
                                            </div>
                                        </form>
                                      </Dialog>
                                       )
                       }
                   }
               </EventConsumer>
              
        )
    
    }
}


