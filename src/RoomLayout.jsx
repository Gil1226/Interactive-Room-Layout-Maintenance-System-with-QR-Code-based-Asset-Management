import LeftPanel from "./LeftPanel";
import './RoomLayout.css'
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import chairPic from './pic/chair.png';
import airconPic from './pic/aircon.png';
import apPic from './pic/ap.png';
import cabinetPic from './pic/cabinet.png';
import cctvPic from './pic/cctv.png';
import deskPic from './pic/desk.png';
import efPic from './pic/ef.png';
import pcPic from './pic/pc.png';
import projectorPic from './pic/projector.png';
import routerPic from './pic/router.png';
import switchPic from './pic/switch.png';
import tvPic from './pic/tv.png';
import whiteBoardPic from './pic/whiteboard.png';

function RoomLayoutPage(){
    const [roomNum, setRoomNum] = useState("");
    const [showItem, setShowItem] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [items, setItems] = useState([
        {id:1, name:'Chair', pic: chairPic},
        {id:2, name:'Aircon', pic: airconPic},
        {id:3, name:'Air Purifier', pic: apPic},
        {id:4, name:'White Board', pic: whiteBoardPic},
        {id:5, name:'Cabinet', pic: cabinetPic},
        {id:6, name:'CCTV', pic: cctvPic},
        {id:7, name:'Desk', pic: deskPic},
        {id:8, name:'Electric Fan', pic: efPic},
        {id:9, name:'PC', pic: pcPic},
        {id:10, name:'Projector', pic: projectorPic},
        {id:11, name:'Router', pic: routerPic},
        {id:12, name:'TV', pic: tvPic},
        {id:13, name:'Switch', pic: switchPic}
    ]);
    const [draggingItem, setDraggingItem] = useState(null);
    const [draggingPosition, setDraggingPosition] = useState({xPos: 0, yPos: 0});
    const [itemDropped, setItemDropped] = useState([]);
    
    const search = async() => {
        setItemDropped([]);
        const searchBar = document.querySelector('.search-rl');
        const searchBarValue = searchBar.value
        if(searchBarValue !== ""){
            setRoomNum(searchBarValue);
        }
        else{
            setRoomNum('Room')
            setItemDropped([]);
        }
        console.log(searchBarValue)
        try {
            const responseSearchSend = await axios.post('http://localhost/backend/RoomLayoutFetch.php', {roomNum: searchBarValue});
            setItemDropped(responseSearchSend.data);
        } catch (error) {
            
        }
    }

    const showItemLayout = () => {
        if(showItem === ""){
            setShowItem('show');
        }
        else{
            setShowItem('');
        }
    }
    const editFunction = () => {
        const editBtn = document.querySelector('.edit-button-rl');
        if (isEdit) {
            setIsEdit(false);
            editBtn.style.color = '#4d1414'
        }
        else{
           setIsEdit(true);
           editBtn.style.color = '#f4bb00'
        }
        
    }
    const dragStart = (e, item, isDropped = false) => {
        const itemSize = e.target.getBoundingClientRect();
        setDraggingItem({...item, dropping: isDropped});

        setDraggingPosition({
          xPos: e.clientX - itemSize.left,
          yPos: e.clientY - itemSize.top
        })
    }
    const whenDrop = (e) => {
        const containerSize =  e.currentTarget.getBoundingClientRect();

        const xPos = e.clientX - containerSize.left - draggingPosition.xPos;
        const yPos = e.clientY - containerSize.top - draggingPosition.yPos;

        if(!draggingItem){
            return
        }

        if (draggingItem.dropping && isEdit) {
            setItemDropped(prevItem =>
                prevItem.map(item =>
                    item.id === draggingItem.id ? { ...item, xPos: xPos, yPos: yPos} : item
                )
            );
        } 
        else if(!draggingItem.dropping){
            setItemDropped(prevItem =>
                [...prevItem, {...draggingItem, id: uuidv4(), xPos: xPos, yPos: yPos, room: roomNum}]
            )   
        }
        setDraggingItem(null);
        setDraggingPosition({xPos: 0, yPos: 0});
    }
    const saveLayout = async() => {
        if (roomNum === '') {
            alert('You Need to Search Room First!');
        }
        if(!isEdit){
            try {
                const responseWhenDrop = await axios.post('http://localhost/backend/RoomLayoutPost.php', itemDropped);
                console.log(responseWhenDrop.data);
            } catch (error) {
                console.log(responseWhenDrop.data);
            }
        }
        else{
            try {
                const responseWhenDrop = await axios.put('http://localhost/backend/RoomLayoutPut.php', itemDropped);
                console.log(responseWhenDrop.data);
            } catch (error) {
                console.log(responseWhenDrop.data);
            }
        }
    }
    const dragOver = (e) => {
        e.preventDefault();
    } 

    return(
        <div className="container"> 
            <div>
                <LeftPanel />
            </div>
            <div>
                <div className='top-panel-container'>
                    <p className="room-num">{roomNum}</p>
                    <div className='search-container'>
                        <input type="text" placeholder='Search for Accountable Person' className='search-bar search-rl'/>
                        <input type="submit" value="search" className='search-button'onClick={search}/>    
                    </div>
                </div>
                <div className="option-panel-container">
                    <div className='dropdown'>
                        <select name="" id="" >
                            <option value="">2000</option>
                        </select>
                    </div>
                    <div className="modify-container">
                        <p onClick={editFunction} className="edit-button-rl">Edit</p>
                        <p onClick={showItemLayout} className={showItem}>Show Items</p>
                    </div>
                </div>
                <div 
                    className="layout-area-panel"
                    onDrop={whenDrop}
                    onDragOver={dragOver}
                >
                    {itemDropped.map((item) =>
                        <div
                            key={item.id}
                            className="item-dropped"
                            draggable
                            onDragStart={(e) => dragStart(e, item, true)}
                            style={{
                                position:"absolute",
                                top: item.yPos,
                                left: item.xPos
                            }}
                        >
                            <img src={item.pic} alt={item.name} 
                            style={{
                                width: '50px',
                                height: '50px'
                            }} 
                            />
                        </div>
                    )} 
                </div>
                <div className={`item-container ${showItem}`}>
                    {items.map((item) => 
                        <div 
                            draggable
                            key={item.id}
                            onDragStart={(e) => dragStart(e, item, false)}
                            style={{
                                left: item.xPos,
                                top: item.yPos
                            }}
                        >   
                            <div className="item-image-container">
                                <img src={item.pic} alt={item.name}/>
                            </div>
                            <p>{item.name}</p>
                        </div>
                    )}
                </div>
                <button onClick={saveLayout} className="btn save-btn-rl">Save</button>
            </div>
        </div>
    )
}
export default RoomLayoutPage;
