import React from "react";  
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";  
import AddBookPage from "./pages/AddBookPage";  
import BooksPage from "./pages/BooksPage";  
import WelcomePage from "./pages/WelcomePage"; // Import the Welcome Page  


function App() {  
    return (  
        <Router>  
            
            <Routes>  
                <Route path="/" element={<WelcomePage />} /> {/* Set Welcome Page as home */}  
                <Route path="/books" element={<BooksPage />} />  
                <Route path="/add" element={<AddBookPage />} />  
            </Routes>  
        </Router>  
    );  
}  

export default App;