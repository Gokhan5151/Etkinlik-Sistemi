import React, { Component } from 'react';
import Events from "./Datas/Events"
import Axios from 'axios';
const context=React.createContext();

export class ProviderMenu extends Component {
    reducer(state,action){
    
        switch(action.type){
            case "UPDATE":
                let datas_copy=[...this.state.datas];
                datas_copy[datas_copy.findIndex(e=>e.id===action.payload.id)]=action.payload;
                return(
                    {
                        ...state,
                        datas:datas_copy
                    }
                )
            case "ADD":
               this.getDatas();
               break;
            case "UPDATED_DATA":
          
                return(
                    {
                        ...state,
                        updated_data:action.payload
                    }
                )
            case "DELETE_EVENT":
                Axios.delete("http://192.168.1.3:8181/delete/"+action.payload).then(res=>{
                  if(res.data){
                      console.log(res.data)
                     
                  }
                });
                return(
                    {
                        ...state,
                        datas:state.datas.filter(e=>e.id!==action.payload)
                    }
                 )
            default:
                break;
        }
        
    }
    state={
        datas:undefined,
        updated_data:{},
        dispatch:action=>(this.setState(
                (state)=>(this.reducer(state,action))
            ))
        
        
        
    }
    componentDidMount(){
        Events().then(res=>{this.setState({datas:res})}).catch(e=>{
            console.log(e);
          })
        
        
    }
    
    getDatas(){
        Events().then(res=>{this.setState({datas:res})}).catch(e=>{
            console.log(e);
        })
    }
    render() {
        return (
          <context.Provider value={this.state}>
              
              {this.props.children}
              
            
          </context.Provider>
        )
    }
}
const EventConsumer=context.Consumer;

export default EventConsumer;
