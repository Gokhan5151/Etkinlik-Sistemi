import React, { Component } from 'react'
import EventList from './EventList'
import UpdateEvent from './UpdateEvent'
import EventConsumer from '../ContextEvents';
export default class List extends Component {
    state={
        visible_update:false,
        succes_toast:false
        
    }
    
 
    update_render=()=>{this.setState({
        visible_update:!this.state.visible_update})}
    render() {
        const {visible_update} = this.state;
    
        return (
         <EventConsumer>
             {
                 value=>{
                
                     return(
                      <div>
                         <EventList update={this.update_render}></EventList>
                
                           {
                             visible_update?
                             <UpdateEvent update={()=>this.setState({
                              visible_update:false})} visible_update={visible_update}></UpdateEvent>:false
                           }
            
                       </div>
            
        
                     )
                 }
             }
         </EventConsumer>
             
           
            
        )
    }
}
