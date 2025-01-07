import React, { useState, useEffect } from "react";  
import { useParams, useNavigate } from "react-router-dom";  
import API from "../api";  

const EditBookPage = () => {  
    const { id } = useParams();  
    const navigate = useNavigate();  

    const [book, setBook] = useState({  
        name: "",  
        author: "",  
        price: "", // Default as an empty string for input compatibility  
    });  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    // Fetch book details  
    useEffect(() => {  
        const fetchBookDetails = async () => {  
            try {  
                const response = await API.get(`/books/${id}`);  
                setBook(response.data);  
            } catch (error) {  
                console.error("Error fetching book details:", error);  
                setError("Failed to fetch book details. Please try again.");  
            } finally {  
                setLoading(false); // End loading regardless of success/failure  
            }  
        };  
        fetchBookDetails();  
    }, [id]);  

    // Handle form input changes  
    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setBook((prev) => ({ ...prev, [name]: value }));  
    };  

    // Update book details  
    const handleSubmit = async (e) => {  
        e.preventDefault();  

        // Simple validation to ensure price is a positive number  
        if (book.price <= 0) {  
            alert("Price must be a positive number.");  
            return;  
        }  

        try {  
            await API.put(`/books/${id}`, book);  
            alert("Book updated successfully!");  
            navigate("/");  
        } catch (error) {  
            console.error("Error updating book:", error);  
            alert("Failed to update book. Please try again.");  
        }  
    };  

    if (loading) {  
        return <div className="text-center">Loading book details...</div>;  
    }  

    if (error) {  
        return <div className="text-center text-danger">{error}</div>;  
    }  

    return (  
        <div className="container mt-4">  
            <h1>Edit Book</h1>  
            <form onSubmit={handleSubmit}>  
                <div className="mb-3">  
                    <label htmlFor="name" className="form-label">  
                        Book Name:  
                    </label>  
                    <input  
                        type="text"  
                        className="form-control"  
                        id="name"  
                        name="name"  
                        value={book.name}  
                        onChange={handleChange}  
                        required  
                    />  
                </div>  
                <div className="mb-3">  
                    <label htmlFor="author" className="form-label">  
                        Author:  
                    </label>  
                    <input  
                        type="text"  
                        className="form-control"  
                        id="author"  
                        name="author"  
                        value={book.author}  
                        onChange={handleChange}  
                        required  
                    />  
                </div>  
                <div className="mb-3">  
                    <label htmlFor="price" className="form-label">  
                        Price:  
                    </label>  
                    <input  
                        type="number"  
                        className="form-control"  
                        id="price"  
                        name="price"  
                        value={book.price}  
                        onChange={handleChange}  
                        required  
                        min="0" 
                    />  
                </div>  
                <button type="submit" className="btn btn-success">  
                    Save Changes  
                </button>  
                <button  
                    type="button"  
                    className="btn btn-secondary ms-2"  
                    onClick={() => navigate("/")}  
                >  
                    Cancel  
                </button>  
            </form>  
        </div>  
    );  
};  

export default EditBookPage;