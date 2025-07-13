import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LoginPage(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [invalidInput, setInvalidInput] = useState('')

    const navigate = useNavigate();

    const formSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost/backend/index.php', {name,password});
            console.log(response);

            const status = response.data.status;
            
            if(status === "success"){
                navigate('/InventoryPage', { state: {name}});
            }
            else{
                setInvalidInput("Invalid Account");
            }
            
        } catch (error) {
            alert("Server Errror");
            console.log(error.response);
        }
        
    }
    const usernameHandler = (e) =>{
        setName(e.target.value);
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
    }

    return(
        <div className="login-page">
            <h1 className="main-title"> Interactive Room Layout Maintenance System with <br/> QR Code-based Asset Management</h1>
            <form className="loginContainer" onSubmit={formSubmit} method='POST'>
                <p className="subtitle">Login</p>
                <input type="text" placeholder="Username" className="input" onChange={usernameHandler} value={name}/>
                <input type="password" placeholder="Password" className="input" onChange={passwordHandler} value={password}/>
                <input type="submit" className="submit"/>
            </form>
        <p>{invalidInput}</p>
        </div>
    )
}
export default LoginPage;