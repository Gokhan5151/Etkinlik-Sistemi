import React, { Component } from 'react'
import MenuListComposition from './UserMenu';
import SimpleTabs from './TabMenu';
import Axios from 'axios';
export default class UserManagement extends Component {

    constructor(){
        super();
        const logged=async ()=>{
            if(localStorage.getItem("Authorization")===null||localStorage.getItem("Authorization")===undefined)
            window.location.href="/login";
          }
          logged();
          Axios.get("http://192.168.1.3:8181/get",{params:{token:localStorage.getItem("Authorization")}}).then(res=>{
            localStorage.setItem("user",JSON.stringify(res.data))
            console.log(localStorage.getItem("Authorization"))
          });
    }
    render() {
        return (
            <div className="container-fluid" style={{backgroundColor:"gray",height:"auto",paddingTop:"5px"}}>
                <div className="container" style={{backgroundColor:"white",height:"1000px"}}>
                 <MenuListComposition></MenuListComposition>
                 <SimpleTabs></SimpleTabs>
                </div>
            </div>
        )
    }
}
