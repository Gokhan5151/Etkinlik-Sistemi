import React, { Component } from 'react'
import EventConsumer from '../ContextEvents';
import EventPersons from './EventPersons'
import { Button } from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventDaytoDayChart from '../Charts/EventDaytoDayChart';

export default class EventList extends Component {

    state={
        clicked_persons_event:undefined,
        open_users_dialog:false,
        day_to_day_chart:false
    }
    render() {
    
        
        return (
            <EventConsumer>
                {
                    value=>{
                        const {clicked_persons_event,open_users_dialog,day_to_day_chart}=this.state;
                        const {dispatch,datas} = value;
                          console.log(datas)
                          return (
                            <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Etkinlik Adı</th>
                                        <th>Başlangıç Tarihi</th>
                                        <th>Bitiş Tarihi</th>
                                        <th>Kayıt olanlar</th>
                                        <th>Kayıt Sayısı</th>
                                    </tr>
                                </thead>
                                <tbody style={{backgroundColor:"white"}}>
                    
                                     {
                                        datas!==undefined?
                                        datas.map(e=>{return(
                    
                                            <tr key={e.id}>
                                                 <td>
                                                     {e.event_name}
                                                 </td>
                                                 
                                                 <td>{new Date(e.event_start_date).toLocaleString("tr-TR").split("T")[0]}</td>
            
                                                 <td>
                                                 {new Date(e.event_last_date).toLocaleString("tr-TR").split("T")[0]}
                                                 </td>
                                                 <td>
                                                     <Button size="small"  onClick={(event)=>(this.setState({clicked_persons_event:e,open_users_dialog:true}))} variant="contained" color="primary">Kayıt Olanlar</Button>
                                                 </td>
                                                 <td>
                                                 {e.user_count}
                                                 </td>
                                                 <td><i className="fa fa-pencil-square-o"  aria-hidden="true" style={{cursor:"pointer"}} onClick={(event)=>{
                                                     if(new Date(e.event_start_date).getTime()>Date.now()){
                        
                                                        dispatch({type:"UPDATED_DATA",payload:e});
                                                        this.props.update();
                                                     }else{
                                                         alert("Etkinlik Başaladığı için değişiklik yapılamaz!");
                                                     }
                                                     }
                                                    }></i></td>
                                                 <td><i className="fa fa-trash" aria-hidden="true" style={{cursor:"pointer"}} onClick={(event_delete)=>{dispatch({type:"DELETE_EVENT",payload:e.id})}}></i></td>
                                                 <td onClick={()=>this.setState({clicked_persons_event:e,day_to_day_chart:true})}>
                                                       
                                                       <AssessmentIcon style={{cursor:"pointer"}} ></AssessmentIcon>
                                                 </td>
                                             </tr>
                                         )
                                             
                                         }):null
                                     }
                                </tbody>
                            </table>
                            {
                             open_users_dialog?<EventPersons event={clicked_persons_event} open_dialog={open_users_dialog} close_dialog={()=>this.setState({open_users_dialog:false})}>
                          </EventPersons>:""
                             }
                             {
                             day_to_day_chart?<EventDaytoDayChart event={clicked_persons_event} open_dialog={day_to_day_chart} close_dialog={()=>this.setState({day_to_day_chart:false})}/>:""
                             }
                        </div>
                          )
                     
                    }
                    
                      
                    
                }
                
            </EventConsumer>
           
        )
    }
}
