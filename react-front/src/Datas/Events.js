
import axios from "axios"

const func=async ()=>{


    var data= await axios.get("http://192.168.1.3:8181/events").then(result=>{
    return result.data
}).catch(e=>{
    console.log(e);
});
return data;
} 
export default function Event(props) {
    return func(); 
}
