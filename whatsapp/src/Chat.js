import React,{useState,useEffect} from 'react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {Avatar} from '@material-ui/core'
import db from './firebase';
import {useStateValue} from './StateProvider';
import firebase from 'firebase';
import './Chat.css'
function Chat() {
    const [messages,setMessages]=useState([]);
    const [input,setInput]=useState("");
    const {roomId} = useParams();
    const [roomName,setRoomName]=useState("");
    const [{user},dispacth]=useStateValue();
    useEffect(()=>{
        if(roomId){
            db.collection("Rooms")
            .doc(roomId)
            .onSnapshot((snapshot)=>(
                setRoomName(snapshot.data().name)
            ));
            db.collection("Rooms").doc(roomId).
            collection("messages").orderBy('timestamp','asc').onSnapshot
            (snapshot=>(
                setMessages(snapshot.docs.map(doc=> doc.data()))
                
            ))
            
            
        }
    },[roomId])

    

    const sendMessage =(e) => {
        e.preventDefault();
        
        db.collection("Rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()

        });
        setInput("");
        
    }
    return (
        <div  className="Chat">
            <div className="Chat__header">
                <Avatar src={`http://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="Chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last active at&#160; 
                        {

                        new Date(
                            messages[messages.length-1]?.timestamp?.toDate())
                            .toUTCString()
                        
                        }</p>
                </div>
                <div className="Chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="Chat__body">
                {messages.map((message)=>(
                    
                     <p className={`Chat__message ${message.name===user.displayName && 'Chat__reciever'}`}>
                     <span className="Chat__name">
                         {message.name}
                     </span>
                     
                        {message.message}
                     <span className="Chat__timestamp">
                             {
                                 new Date (message.timestamp?.toDate()).toUTCString()
                             }
                     </span>
                 </p>
                ))
                
                }
            </div>
            <div className="Chat__footer">
                <IconButton>

                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input type="text"  placeholder="Type a message" value={input} onChange={(e)=>{setInput(e.target.value) }}/>
                    <button type="submit" onClick={sendMessage} >Send a Message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default Chat;