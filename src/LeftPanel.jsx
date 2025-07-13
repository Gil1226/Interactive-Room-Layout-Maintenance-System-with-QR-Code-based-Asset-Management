import { useEffect, useState } from 'react';
import './LeftPanel.css'
import { useLocation, useNavigate } from 'react-router-dom';
function LeftPanel(){
    const location = useLocation();
    const navigate = useNavigate();

    const name = location.state?.name || 'guest';
    const activePage = location.pathname;

    const directInventory = () =>{
        navigate("/InventoryPage", { state: {name}});
    }
    const directRoomLayout = () =>{
        navigate("/RoomLayoutPage", { state: {name}});
    }
    const directRepairHistory = () =>{
        navigate("/RepairHistoryPage", { state: {name}});
    }
    const directGenerateCode = () =>{
        navigate("/GenerateCodePage", { state: {name}});
    }

    return(
        <div> 
            <div className="left-panel-container">
                <div className="info-container">
                    <p>{name}</p>
                    <p>notif</p>
                </div>
                <div className="nav-option-container">
                    <p onClick={directInventory} style={{color: activePage === "/InventoryPage" ? '#f4bb00': 'white', borderBottom: activePage === "/InventoryPage" ? '1px solid #f4bb00': '1px solid white'}}>Inventory</p>
                    <p onClick={directRoomLayout} style={{color: activePage ==="/RoomLayoutPage" ? '#f4bb00': 'white', borderBottom: activePage === "/RoomLayoutPage" ? '1px solid #f4bb00': '1px solid white'}}>Room Layout</p>
                    <p onClick={directRepairHistory} style={{color: activePage ==="/RepairHistoryPage" ? '#f4bb00': 'white', borderBottom: activePage === "/RepairHistoryPage" ? '1px solid #f4bb00': '1px solid white'}}>Repair History</p>
                    <p onClick={directGenerateCode} style={{color: activePage ==="/GenerateCodePage" ? '#f4bb00': 'white', borderBottom: activePage === "/GenerateCodePage" ? '1px solid #f4bb00': '1px solid white'}}>Generate Code</p>
                </div>
                <div className="logout-container">
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
}
export default LeftPanel;