import React, { Component } from 'react'
import {DataScroller} from 'primereact/datascroller';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Button from '@material-ui/core/Button';
import ApplyEvent from '../User/ApplyEvent';
import {Paginator} from 'primereact/paginator';
import Axios from "axios";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.setData();
        this.eventTemplate=this.eventTemplate.bind(this);
       
    }
  
    state={
        visible_apply:false,
        first:0,
        rows:5,
        clicked_event_id:undefined
        ,datas:""
        ,loggin_user:JSON.parse(localStorage.getItem("user"))

    }
    eventTemplate(item) {
     
              
                return(
                item?
                <div className="card" style={{marginBottom:"20px",opacity:item.user_count===10?"70%":"100%"}}>
                <div className="card-header"><h3>Etkinlik Adı:{item.event_name}</h3>Eklenme Tarihi : {item.creation_date.split("T")[0]}</div>
                <div className="card-body">
                                 
                   <div style={{float:"left"}}><CalendarTodayIcon fontSize="large" style={{borderRight:"solid 2px",marginRight:"20px"}}/>Etkinliği katılmanızı bekleriz...</div> 
                  {
                      item.user_count===10?<h4 style={{float:"right"}}>Doldu</h4>:<Button color="primary" variant="contained" style={{float:"right"}} onClick={(e)=>this.setState({visible_apply:true,clicked_event_id:item.id})}>Katıl</Button>

                  }
                  
                    </div>
                <div className="card-footer" style={{backgroundColor:"skyblue",color:"white"}}>   Başlangıç Tarihi : {new Date(item.event_start_date).toLocaleString("tr-TR").split(" ")[0]}-Bitiş Tarihi : {new Date(item.event_last_date).toLocaleString("tr-TR").split(" ")[0]}</div>
              </div>:null)
       
     
    }
    async setData(){
        await Axios.get("http://192.168.1.3:8181/events").then(res=>{
            if(res.data)
             this.setState({
               datas:res.data
             })
         }).catch(e=>{
             console.log(e)
         });
    }
    render() {
        const {clicked_event_id,visible_apply,datas}=this.state;
        let datas_concated=[];
         
        console.log(this.state.datas);
        
        [].concat(datas).forEach(e=>{
              if(this.state.loggin_user.events.find(event=>event.id===e.id)!==undefined)
                  return false;
              if(Date.now()<new Date({...e}.event_start_date).getTime())
              {
                datas_concated.push(e)
              }
               else return false;
        });
        
        return (
         <div>
                        <div>
                              {
                                  datas!==undefined?<DataScroller lazy={true} header="Events" value={datas_concated.slice((this.state.first/5)*this.state.rows,this.state.rows+(this.state.first/5)*this.state.rows)} itemTemplate={this.eventTemplate} ></DataScroller>:null
                              }
                         {visible_apply?<ApplyEvent event_id={clicked_event_id}  visible_dialog={visible_apply} visible={()=>this.setState({visible_apply:false})}></ApplyEvent>:false} 
                          <Paginator totalRecords={datas_concated.length}   first={this.state.first}  rows={this.state.rows} onPageChange={(e) => this.setState({first: e.first})}></Paginator>
                       </div>
         </div>
     
        )
    }
}
