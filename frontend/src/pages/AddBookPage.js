import React, { useState } from "react";  
import API from "../api";  
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection  
import "../styles/AddBookPage.css";  

const AddBookPage = () => {  
    const [formData, setFormData] = useState({  
        name: "",  
        author: "",  
        price: "",  
        rackNo: "",  
        dateOfPurchase: "",  
    });  

    const navigate = useNavigate(); // Initialize useNavigate hook  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setFormData((prev) => ({  
            ...prev,  
            [name]: value,  
        }));  
    };  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        API.post("/books", formData)  
            .then((response) => {  
                alert("Book added successfully!");  
                // Redirect to the Books Page after successful submission  
                navigate("/books");   
            })  
            .catch((error) => {  
                console.error(error);  
                alert("Failed to add book.");  
            });  
    };  

    return (  
        <div className="add-book-container">  
            <h1>Add a New Book</h1>  
            <form onSubmit={handleSubmit} className="add-book-form">  
                <label>Book Name</label>  
                <input  
                    type="text"  
                    name="name"  
                    value={formData.name}  
                    onChange={handleChange}  
                    required  
                />  

                <label>Author</label>  
                <input  
                    type="text"  
                    name="author"  
                    value={formData.author}  
                    onChange={handleChange}  
                    required  
                />  

                <label>Price</label>  
                <input  
                    type="number"  
                    name="price"  
                    value={formData.price}  
                    onChange={handleChange}  
                />  

                <label>Rack No</label>  
                <input  
                    type="text"  
                    name="rackNo"  
                    value={formData.rackNo}  
                    onChange={handleChange}  
                />  

                <label>Date of Purchase</label>  
                <input  
                    type="date"  
                    name="dateOfPurchase"  
                    value={formData.dateOfPurchase}  
                    onChange={handleChange}  
                />  

                <button type="submit">Add Book</button>  
            </form>  
        </div>  
    );  
};  

export default AddBookPage;