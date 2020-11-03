import React,{useState,useEffect} from 'react';
import './Sidebarchat.css';
import {Avatar} from '@material-ui/core'
import db from './firebase'
import {Link} from 'react-router-dom';
function Sidebarchat({addNewChat,name,id}) {
   
    const [messages,setMessages]=useState([]);

    useEffect(()=>{
        if (id){
            db.collection('Rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>(
                    setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
       
    },[id])
   
    const createChat=()=>{
        const roomName=prompt("Please enter room name");

        if (roomName){
            db.collection("Rooms").add({
                name:roomName
            });
        }
    };
    
return !addNewChat ? (
        <Link  to={`/rooms/${id}`}>
            <div  className="Sidebarchat">
                <Avatar src={`http://avatars.dicebear.com/api/human/${id}.svg `} />
                <div className="Sidebarchatinfo">
                    <h2>{name}</h2> 
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    
) : (
        <div  className="Sidebarchat" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    )
}
export default Sidebarchat;