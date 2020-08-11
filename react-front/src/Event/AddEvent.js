import React,{Component} from "react";
import { Calendar } from 'primereact/calendar';
import axios from "axios";
import EventConsumer from "../ContextEvents";


class AddEvent extends Component{
  
 
  state={
    event:"",
    start_date:0,
    finish_date:0,
    success:false,
    stateVisible:false,
  }
  async OnSubmit(dispatch,e){
    e.preventDefault();
    const {event,start_date,finish_date}=this.state;
  
   
 
  if(start_date!==0&&finish_date!==0&&event!=="")

  await axios.post("http://192.168.1.3:8181/newevent",
  {id:null,event_name:event,event_start_date:start_date,event_last_date:finish_date,persons:null}
  )
  .then(result=>{
   
    if(result.data===true){
      this.setState({
        success:true,
        stateVisible:true
      })
      
    } else this.setState({
      success:false,
      stateVisible:true
    });

  })
  dispatch({
    type:"ADD",
    payload:Date.now()
  })
}
  render(){
    const{stateVisible,success}=this.state;
     return (
            <EventConsumer>
              {
   
                value=>{
                     const {dispatch}=value
                     return(
                      <div className="card">
            
                      <div className="card-body">
                      <form onSubmit={this.OnSubmit.bind(this,dispatch)}>
                        
                        <div className="form-group mb-5"> 
                         
                         <label htmlFor="event">Etkinlik:</label>
                         <input required style={{float:"left"}} type="text" name="name" id="id" placeholder="Etkinlik" className="form-control" onChange={(e)=>{this.setState({event:e.target.value})}}></input>
        
                        </div>
                        
                       <br></br>
                        <div className="form-group mb-5">
                         
                         <label htmlFor="event" style={{float:"left"}}>Başlangıç Tarihi:</label>
                         <Calendar required style={{float:"left"}} inline={false} maxDate={this.state.finish_date} minDate={new Date(Date.now())} value={this.state.start_date} onChange={(e) => this.setState({start_date: e.target.value})}></Calendar>                        </div>
                        <br></br>
                        <div className="form-group mb-5">
                         
                         <label htmlFor="event" style={{float:"left"}}>Bitiş Tarihi:</label>
                          <Calendar required style={{float:"left"}} inline={false} minDate={this.state.start_date?this.state.start_date:new Date(Date.now())}  value={this.state.finish_date} onChange={(e) => this.setState({finish_date: e.target.value})}></Calendar>
                        </div>
                        <button type="submit" onSubmit={this.OnSubmit.bind(this,dispatch)} className="btn btn-dark btn-block">Ekle</button>
                       </form>
                      </div>
                      {
                     
                           
                           stateVisible?(
                              success? <div className="alert alert-success">
                              <strong>Başarılı!</strong> Etkinlik Başarılı bir şekilde eklendi.
                            </div>:<div className="alert alert-warning">
                              <strong>Hata!</strong> Bir hata oluştu!
                            </div>):<div className="alert alert-info">
                              <strong>Bilgi:</strong> Ek olarak sorular ekleyebilirsiniz.
                            </div>
                            
        
                          
                            
                           
                       } 
                     
                    </div>
                     );
                }
              }
            </EventConsumer>
          

     )

   }
}

export default AddEvent;