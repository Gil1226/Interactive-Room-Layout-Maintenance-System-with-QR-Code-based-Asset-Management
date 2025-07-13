import LeftPanel from './LeftPanel'
import { createElement, useEffect } from 'react';
import { useState } from 'react';
import './Inventory.css'
import axios from 'axios';
function InventoryPage(){
    const[assetList, setAssetList] = useState([]);
    const[selectedAsset, setSelectedAsset] = useState('');
    const[detailedAsset, setDetailedAsset] = useState([]);

    const fetchAssets = async () => {
        try {
            const response = await axios.get('http://localhost/backend/inventory.php');
            setAssetList(response.data)
        } catch (error) {
            alert("Server Errror");
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchAssets();
    }, []);

    const selectAsset = (id)=>{
        setSelectedAsset(id);
        console.log(id);
    }

    const deleteAsset = async (id) =>{
        if (selectedAsset !== '') {
            const confirmSelect = window.confirm("Are you sure you want to delete this item?");
            if(!confirmSelect){
                return;
            }
        }
        else{
            alert('You must Click an Item!');
        }
        
        try {
            const responseDelete = await axios.post("http://localhost/backend/removeItem.php", {id});
            
            if(responseDelete.data.status === "success"){
                setAssetList(assetList.filter(item => item.id !== id))
                setSelectedAsset(null);
            }
        } catch (error) {
            alert("Server Errror");
            console.log(error.response);
        }
    }

    const doubleC = (id) => {
        const chosenAsset = assetList.filter(item => item.id == id);
        setDetailedAsset(chosenAsset);
    }

    const edit = () => {
        const tableData = document.querySelectorAll('.show-detailed-info td');
        const editBtn = document.querySelector('.edit-button');
        const saveBtn = document.querySelector('.save-button');

        tableData.forEach((td) => {
            const inputElement = document.createElement('input');
            const displayData = td.textContent;
            inputElement.type = "text";
            inputElement.value = displayData;
            td.replaceWith(inputElement);
        });
        editBtn.style.display = "none";
        saveBtn.style.display = "block";
    }

    const save = async () => {
        const inputElement = document.querySelectorAll('.show-detailed-info input');
        const editBtn = document.querySelector('.edit-button');
        const saveBtn = document.querySelector('.save-button');

        const labels = ["Prop#", "Description", "Asset", "Accountable", "Date Issued", "Date Acquired", "Room#", "Life Span"];

        const updatedStorageObj = {}

        inputElement.forEach((inputs, index) => {
            updatedStorageObj[labels[index]] = inputs.value
        })
        updatedStorageObj['id'] = selectedAsset;
        console.log(updatedStorageObj);
        
        try {
            const saveResponse = await axios.put('http://localhost/backend/updateItem.php', updatedStorageObj);

            const tableData = document.querySelectorAll('.show-detailed-info input');

            if (saveResponse.data.status === 'success') {
                fetchAssets();
                tableData.forEach((inputElement) => {
                    const data = document.createElement('td');
                    data.textContent = inputElement.value;
                    inputElement.replaceWith(data);
                })
            }
            else{
                alert(saveResponse.data);
            }
        } catch (error) {
            alert("Server Error");
            console.log(error.response);
        }
        saveBtn.style.display = "none";
        editBtn.style.display = "block";
    }

    const cancel = () => {
        setDetailedAsset([]);
    }

    const showAdd = () => {
        const addContainer = document.querySelector('.add-item-table')
        addContainer.style.display = 'block';
    }

    const addItem = async() => {
        const addContainer = document.querySelector('.add-item-table')
        const inputElement = document.querySelectorAll('.add-item-info input');

        const labels = ["Prop#", "Description", "Asset", "Accountable", "Date Issued", "Date Acquired", "Room#", "Life Span"];
        const inputsStorageObject = {};

        inputElement.forEach((inputs, index) => {
            inputsStorageObject[labels[index]] = inputs.value;
        })
        try {
            const addItemResponse = await axios.post('http://localhost/backend/addItem.php', inputsStorageObject);
            console.log(addItemResponse);
            if (addItemResponse.data.status === 'success') {
                addContainer.style.display = 'none';
                alert('Adding Item Successful');
                fetchAssets();
            }
        } catch (error) {
            
        }
        
    }
    const cancelAddItem = () => {
        const addContainer = document.querySelector('.add-item-table')
        addContainer.style.display = 'none';
    }
    return(
        <div className='container'>
            <LeftPanel/>
            <div className='right-panel-container'>
                <div className='top-panel-container'>
                    <div className='dropdown'>
                        <select name="" id="" >
                            <option value="">2000</option>
                        </select>
                    </div>
                    
                    <div className='search-container'>
                        <input type="text" placeholder='Search for Accountable Person' className='search-bar'/>
                        <input type="button" value="search" className='search-button'/>    
                    </div>
                </div>
                <div className="middle-panel">
                    <ul className='label-container'>
                        <li>Prop#</li>
                        <li>Description</li>
                        <li>Asset</li>
                        <li>Accountable</li>
                        <li>Date Issued</li>
                        <li>Date Acquired</li>
                        <li>Room#</li>
                        <li>Life Span</li>
                    </ul>
                    {assetList.map(item => (
                    <ul className={`label-container ${item.id === selectedAsset ? "highlight":""}`} id='item-container' 
                        key={item.id} 
                        onClick={() => selectAsset(item.id)} onDoubleClick={() => doubleC(item.id)}>
                        <li>{item['Prop#']}</li>
                        <li>{item.Description}</li>
                        <li>{item.Asset}</li>
                        <li>{item.Accountable}</li>
                        <li>{item['Date Issued']}</li>
                        <li>{item['Date Acquired']}</li>
                        <li>{item['Room#']}</li>
                        <li>{item['Life Span']}</li>
                    </ul>
                ))}
                {detailedAsset.map(item => (
                    <div key={item.id} className='detailed-info-container'>
                        <table className='show-detailed-info'>
                            <caption>Full Details</caption>
                            <tbody>
                                <tr>
                                    <th>Prop#:</th>
                                    <td>{item['Prop#']}</td>
                                </tr>
                                <tr>
                                    <th>Description:</th>
                                    <td>{item.Description}</td>
                                </tr>
                                <tr>
                                    <th>Asset:</th>
                                    <td>{item.Asset}</td>
                                </tr>
                                <tr>
                                    <th>Accountable:</th>
                                    <td>{item.Accountable}</td>
                                </tr>
                                <tr>
                                    <th>Date Issued:</th>
                                    <td>{item['Date Issued']}</td>
                                </tr>
                                <tr>
                                    <th>Date Acquired:</th>
                                    <td>{item['Date Acquired']}</td>
                                </tr>
                                <tr>
                                    <th>Room:</th>
                                    <td>{item['Room#']}</td>
                                </tr>
                                <tr>
                                    <th>Life Span:</th>
                                    <td>{item['Life Span']}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='detailed-option-container'>
                                <p onClick={edit} className='edit-button'>Edit</p>
                                <p onClick={save} className='save-button'>Save</p>
                                <p onClick={cancel}>Back</p>
                        </div>
                    </div> 
                ))}
                <div className='add-item-table'>
                    <table className='add-item-info'>
                        <caption>Input Item Details</caption>
                        <tbody>
                            <tr>
                                <th>Prop#:</th>
                                <input type="text" required/>
                            </tr>
                            <tr>
                                <th>Description:</th>
                                <input type="text" required/>
                            </tr>
                            <tr>
                                <th>Asset:</th>
                                <input type="text" required/>
                            </tr>
                            <tr>
                                <th>Accountable:</th>
                                <input type="text" required/>
                            </tr>
                            <tr>
                                <th>Date Issued:</th>
                                <input type="date" required/>
                            </tr>
                            <tr>
                                <th>Date Acquired:</th>
                                <input type="date" required/>
                            </tr>
                            <tr>
                                <th>Room:</th>
                                <input type="text" required/>
                            </tr>
                            <tr>
                                <th>Life Span:</th>
                                <input type="date" required/>
                            </tr>
                        </tbody>
                    </table>
                    <div className='add-option-container'>
                        <p onClick={addItem} className='add-button'>Add</p>
                        <p onClick={cancelAddItem} className='cancel-button'>Cancel</p>
                    </div>
                </div>
                </div>
                <div className="bottom-panel">
                    <button onClick={() => deleteAsset(selectedAsset)}>Remove</button>
                    <button onClick={showAdd}>Add Item</button>
                </div>
            </div>
        </div>
    )
}
export default InventoryPage;