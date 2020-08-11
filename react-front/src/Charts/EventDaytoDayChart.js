import React, { Component } from 'react'
import { Button } from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
  } from '@devexpress/dx-react-chart-material-ui';
export default class EventDaytoDayChart extends Component {
    footer = (
          <div>
             <Button label="Kapat" icon="pi pi-times" onClick={this.onHide.bind(this)} />
          </div>         
    )
    
    getBarChartData(event){
    
       
        let data=[]
        let bar_datas=[];
        event.application_dates.forEach(date=>{
            if(!data.includes(date.application_date)){
                data.push(date.application_date);
            }
        });
        data.forEach(date_process=>{
            var count=0;
            event.application_dates.forEach(date=>{
                if(date_process===date.application_date){
                    count++;
                    console.log(count)
                }
            });
            bar_datas.push({
              "date":date_process,
               "application_count":count
            });
          
        })
        
        return bar_datas;
     
      
    }
    getBarChart(){
        let barchar_data=this.getBarChartData(this.props.event);
       
        return (
        <Paper>
            <Chart data={barchar_data}>
            <ArgumentAxis />
             <ValueAxis />
              <BarSeries
                valueField="application_count"
                argumentField="date"
              />
             
          
            </Chart>
        </Paper>      
        )
    }

    onHide(e){
      this.props.close_dialog();
    }
   
    render() {
        const visible_update=this.props.open_dialog;
        return (
            <Dialog maximizable={true} header={this.props.event.event_name} footer={this.footer}   visible={visible_update} style={{width: '50vw'}} modal={true} onHide={this.onHide.bind(this)}>
            {
                 this.getBarChart()
            }
          </Dialog>
        )
    }
}
