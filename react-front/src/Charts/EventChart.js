import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import EventConsumer from '../ContextEvents';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
  } from '@devexpress/dx-react-chart-material-ui';


  
export default class EventChart extends Component {

    getBarChartData(datas){
    
        let datas_formapping=[]
        datas_formapping=datas_formapping.concat(datas);
        let data=[];
     
        datas_formapping.map(event=>{
            
            data.push({
                "event":event.event_name+"-"+event.id,
                "person_count":event.persons.length
            });
            return event;
        });
        return data;
    }
    getBarChart(datas){
       
        let barchar_data=this.getBarChartData(datas);
       
        return (
        <Paper>
            <Chart data={barchar_data}>
            <ArgumentAxis />
             <ValueAxis />
              <BarSeries
                valueField="person_count"
                argumentField="event"
              />
             
          
            </Chart>
        </Paper>      
        )
    }
    render() {
        return (
            <EventConsumer>
                {
                    value=>{
                        
                        
                         const{datas}=value;
                      
                      
                        return(
                            datas!==undefined?
                            this.getBarChart(datas):"Etkinlik bulunamadı..."
                            )
                    }
                }
            </EventConsumer>
     
        )
    }
}
