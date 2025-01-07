import React, { useState, useEffect } from "react";  
import API from "../api";  
import "../styles/EditBookPage.css";  

const EditBookPage = ({ bookId }) => {  
    const [formData, setFormData] = useState({  
        name: "",  
        author: "",  
        price: "",  
        rackNo: "",  
        dateOfPurchase: "",  
        edition: "",  
    });  

    useEffect(() => {  
        // Fetch the book details when the component mounts  
        API.get(`/books/${bookId}`)  
            .then((response) => {  
                setFormData(response.data);  
            })  
            .catch((error) => {  
                console.error(error);  
                alert("Failed to load book data.");  
            });  
    }, [bookId]);  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setFormData((prev) => ({  
            ...prev,  
            [name]: value,  
        }));  
    };  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        API.put(`/books/${bookId}`, formData)  
            .then((response) => {  
                alert("Book updated successfully!");  
            })  
            .catch((error) => {  
                console.error(error);  
                alert("Failed to update book.");  
            });  
    };  

    return (  
        <div className="edit-book-container">  
            <h1>Edit Book Details</h1>  
            <form onSubmit={handleSubmit} className="edit-book-form">  
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

                <label>Edition</label>  
                <input  
                    type="text"  
                    name="edition"  
                    value={formData.edition}  
                    onChange={handleChange}  
                />  

                <button type="submit">Update Book</button>  
            </form>  
        </div>  
    );  
};  

export default EditBookPage;