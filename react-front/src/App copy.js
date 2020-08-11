import React from 'react';
import './App.css';
import {Component} from "react";
import AddEvent from "./Event/AddEvent"
import {TabMenu} from 'primereact/tabmenu';
import List from "./Event/List"

//import {BrowserRouter as Router, Route, Link} from "react-router-dom";


class App extends Component{
  state={
    items: [
        {label: 'Anasayfa', icon: 'pi pi-fw pi-home'},
        {label: 'Etkinlik Ekle', icon: 'pi pi-fw pi-calendar'},
        {label: 'Düzenle', icon: 'pi pi-fw pi-pencil'},
        {label: 'Etkinlikler', icon: 'pi pi-fw pi-file'},
        {label: 'Ayarlar', icon: 'pi pi-fw pi-cog'}
    ],
    activeItem:{label: 'Anasayfa', icon: 'pi pi-fw pi-home'}

    
}

render(){
  const{activeItem} = this.state;
  const selected=(activeItem)=>{
         switch(activeItem){
           case this.state.items[0]:
             break;
          case this.state.items[1]:
              return <AddEvent/>
          case this.state.items[2]:
             break;
          case this.state.items[3]:
              return <List/>
          case this.state.items[4]:
              break;
          default:
             return null;
         }
  }
  return (
   
     <div className="App pt-2 pl-2 pr-2">
      <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => this.setState({activeItem: e.value})}/>
      {
       selected(activeItem)
      }
    </div>

  
  );
}
}


export default App;
