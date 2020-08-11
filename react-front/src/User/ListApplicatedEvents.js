import React, { Component } from 'react'
import {DataScroller} from 'primereact/datascroller';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Button from '@material-ui/core/Button';
import {Paginator} from 'primereact/paginator';
export default class ListApplicatedEvents extends Component {
    constructor(){
        super();
        this.eventTemplate=this.eventTemplate.bind(this);
    }
    state={
        first:0,
        rows:5,
        loggin_user:undefined
    }
    componentDidMount(){
        this.setState({loggin_user:JSON.parse(localStorage.getItem("user"))});
    }
    eventTemplate(item) {
        
        return(
        item?
        <div className="card" style={{marginBottom:"20px",opacity:item.user_count===10?"70%":"100%"}}>
        <div className="card-header"><h3>Etkinlik Adı:{item.event_name}</h3>Eklenme Tarihi : {item.creation_date.split("T")[0]}</div>
        <div className="card-body">
                         
        <div style={{float:"left"}}><CalendarTodayIcon fontSize="large" style={{borderRight:"solid 2px",marginRight:"20px"}}/>{Date.now()>new Date(item.event_start_date).getTime()?"Etkinlik Başladı!":"Etkinliğe hoş geldiniz.."}</div> 
    
          {
              (Date.now()>new Date(item.event_start_date).getTime()&&Date.now()<new Date(item.event_last_date).getTime())?<Button href={"/event/"+item.id} style={{float:"right"}} variant='outlined' color='primary'>Katıl</Button>:null
          }
          {
              Date.now()>new Date(item.event_last_date).getTime()?<h5 style={{float:"right"}}>Etkinlik Bitmiştir</h5>:null
          }
            </div>
        <div className="card-footer" style={{backgroundColor:"skyblue",color:"white"}}>   Başlangıç Tarihi : {new Date(item.event_start_date).toLocaleString("tr-TR").split(" ")[0]}-Bitiş Tarihi : {new Date(item.event_last_date).toLocaleString("tr-TR").split(" ")[0]}</div>
    
      </div>:null)
     }
    render() {
        var datas_concated=[];
        datas_concated=datas_concated.concat(JSON.parse(localStorage.getItem("user")).events)
      
        return (
        
                        <div>
                              
                          <DataScroller lazy={true} header="Events" value={datas_concated.slice((this.state.first/5)*this.state.rows,this.state.rows+(this.state.first/5)*this.state.rows)} itemTemplate={this.eventTemplate} ></DataScroller>
                          <Paginator totalRecords={datas_concated.length}   first={this.state.first}  rows={this.state.rows} onPageChange={(e) => this.setState({first: e.first})}></Paginator>
                       </div>
            
        )
    }
}
