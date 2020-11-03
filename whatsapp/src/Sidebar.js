import React,{useEffect,useState} from 'react';
import {Avatar,IconButton} from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Sidebar.css'
import Sidebarchat from './Sidebarchat'
import db from './firebase'
import {useStateValue} from './StateProvider';
function Sidebar() {
    const [{user},dispatch]=useStateValue();
    const[rooms,setRooms]=useState([]);
    useEffect(()=>{
        db.collection('Rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        ))
    },[])
    return (
        <div className="Sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                   <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    < SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start a new chat"/>
                </div>
                
            </div>
            <div className="sidebar__chats">
                <Sidebarchat addNewChat/>
                {rooms.map((room)=> (
                    <Sidebarchat key={room.id} id={room.id} name={room.data.name}/>
                ))}
                
                
                
                
            </div>
        </div>
    );
};

export default Sidebar;