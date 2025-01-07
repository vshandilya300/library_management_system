import React from "react";  
import { useNavigate } from "react-router-dom";  // Make sure you have react-router-dom installed  
import "../styles/WelcomePage.css";  

const WelcomePage = () => {  
    const navigate = useNavigate(); // Hook to programmatically navigate  

    const handleRedirect = () => {  
        navigate("/books"); // Use navigate to redirect to your home route  
    };  

    return (  
        <div className="welcome-container">  
            <h1>Welcome to the Library Management System</h1>  
             
            <button onClick={handleRedirect} className="welcome-button">Enter here</button>  
        </div>  
    );  
};  

export default WelcomePage;