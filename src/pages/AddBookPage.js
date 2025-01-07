import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import API from "../api";  
import { v4 as uuidv4 } from "uuid";   
import "../styles/AddBookPage.css";  

const AddBookPage = () => {  
    const navigate = useNavigate();  

    const [book, setBook] = useState({  
        book_id: "",  
        name: "",  
        author: "",  
        price: "",  
        rackNo: "",  
        dateOfPurchase: "",  
    });  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setBook((prev) => ({ ...prev, [name]: value }));  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        const newBook = {  
            ...book,  
            book_id: uuidv4(),   
        };  

        try {  
            await API.post("/books", newBook); 
            alert("Book added successfully!");  
            navigate("/");  
        } catch (error) {  
            console.error("Error adding book:", error);  
            alert("Failed to add book. Please try again.");  
        }  
    };  

    return (  
        <div className="add-book-container">  
            <div className="form-card">  
                <h1 className="form-title">Add a New Book</h1>  
                <form onSubmit={handleSubmit} className="book-form">  
                    <div className="form-group">  
                        <label htmlFor="name">Book Name:</label>  
                        <input  
                            type="text"  
                            id="name"  
                            name="name"  
                            value={book.name}  
                            onChange={handleChange}  
                            placeholder="Enter book name"  
                            required  
                        />  
                    </div>  
                    <div className="form-group">  
                        <label htmlFor="author">Author:</label>  
                        <input  
                            type="text"  
                            id="author"  
                            name="author"  
                            value={book.author}  
                            onChange={handleChange}  
                            placeholder="Enter author's name"  
                            required  
                        />  
                    </div>  
                    <div className="form-group">  
                        <label htmlFor="price">Price:</label>  
                        <input  
                            type="number"  
                            id="price"  
                            name="price"  
                            value={book.price}  
                            onChange={handleChange}  
                            placeholder="Enter price"  
                            required  
                        />  
                    </div>  
                    <div className="form-group">  
                        <label htmlFor="rackNo">Rack Number:</label>  
                        <input  
                            type="text"  
                            id="rackNo"  
                            name="rackNo"  
                            value={book.rackNo}  
                            onChange={handleChange}  
                            placeholder="Enter rack number"  
                            required  
                        />  
                    </div>  
                    <div className="form-group">  
                        <label htmlFor="dateOfPurchase">Date of Purchase:</label>  
                        <input  
                            type="date"  
                            id="dateOfPurchase"  
                            name="dateOfPurchase"  
                            value={book.dateOfPurchase}  
                            onChange={handleChange}  
                            required  
                        />  
                    </div>  
                    <div className="button-group">  
                        <button type="submit" className="btn btn-primary">  
                            Add Book  
                        </button>  
                        <button  
                            type="button"  
                            className="btn btn-secondary"  
                            onClick={() => navigate("/")}  
                        >  
                            Cancel  
                        </button>  
                    </div>  
                </form>  
            </div>  
        </div>  
    );  
};  

export default AddBookPage;