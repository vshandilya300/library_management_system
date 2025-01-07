// WelcomePage.js  
import React from 'react';  
import { useNavigate } from 'react-router-dom'; 
import '../styles/WelcomePage.css';  

const WelcomePage = () => {  
    const navigate = useNavigate();  

    const handleClick = () => {  
        navigate('/book');  
    };  

    return (  
        <div className="container">  
            <h1>Welcome to the Library Management System</h1>  
            <button className="welcome-button" onClick={handleClick}>  
                Start Here  
            </button>  
        </div>  
    );  
};  

export default WelcomePage;