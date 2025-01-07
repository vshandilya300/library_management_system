import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/book" element={<BooksPage />} />
                <Route path="/add" element={<AddBookPage />} />
                <Route path="/edit/:id" element={<EditBookPage />}/>
            </Routes>
        </Router>
    );
};

export default App;
