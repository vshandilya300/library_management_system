import React, { useState, useEffect } from "react";  
import API from "../api";  
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation  
import "../styles/BooksPage.css"; // Import the CSS file  

const BooksPage = () => {  
    const [books, setBooks] = useState([]);  
    const [editingBook, setEditingBook] = useState(null);  
    const navigate = useNavigate(); // Initialize useNavigate  

    useEffect(() => {  
        fetchBooks();  
    }, []);  

    const fetchBooks = () => {  
        API.get("/books")  
            .then((response) => setBooks(response.data))  
            .catch((error) => console.error(error));  
    };  

    const handleDelete = (id) => {  
        if (window.confirm("Are you sure you want to delete this book?")) {  
            API.delete(`/books/${id}`)  
                .then(() => {  
                    alert("Book deleted successfully!");  
                    fetchBooks();  
                })  
                .catch((error) => console.error(error));  
        }  
    };  

    const handleEdit = (book) => {  
        setEditingBook(book);  
    };  

    const handleSave = () => {  
        API.put(`/books/${editingBook._id}`, editingBook)  
            .then(() => {  
                alert("Book updated successfully!");  
                fetchBooks();  
                setEditingBook(null);  
            })  
            .catch((error) => console.error(error));  
    };  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setEditingBook((prev) => ({  
            ...prev,  
            [name]: value,  
        }));  
    };  

    const handleAddBook = () => {  
        navigate("/add"); // Navigate to the AddBookPage  
    };  

    return (  
        <div className="books-container">  
            <h1>Books List</h1>  
            <button className="btn btn-add" onClick={handleAddBook}>  
                Add Book  
            </button>  
            <table className="books-table">  
                <thead>  
                    <tr>  
                        <th>ID</th>  
                        <th>Name</th>  
                        <th>Author</th>  
                        <th>Price</th>  
                        <th>Rack No</th>  
                        <th>Date of Purchase</th>  
                        <th>Actions</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {books.map((book) => (  
                        <tr key={book._id}>  
                            {editingBook && editingBook._id === book._id ? (  
                                <>  
                                    <td>{book._id}</td>  
                                    <td>  
                                        <input  
                                            type="text"  
                                            name="name"  
                                            value={editingBook.name}  
                                            onChange={handleChange}  
                                            className="editing-input"  
                                        />  
                                    </td>  
                                    <td>  
                                        <input  
                                            type="text"  
                                            name="author"  
                                            value={editingBook.author}  
                                            onChange={handleChange}  
                                            className="editing-input"  
                                        />  
                                    </td>  
                                    <td>  
                                        <input  
                                            type="number"  
                                            name="price"  
                                            value={editingBook.price}  
                                            onChange={handleChange}  
                                            className="editing-input"  
                                        />  
                                    </td>  
                                    <td>  
                                        <input  
                                            type="text"  
                                            name="rackNo"  
                                            value={editingBook.rackNo}  
                                            onChange={handleChange}  
                                            className="editing-input"  
                                        />  
                                    </td>  
                                    <td>  
                                        <input  
                                            type="date"  
                                            name="dateOfPurchase"  
                                            value={editingBook.dateOfPurchase}  
                                            onChange={handleChange}  
                                            className="editing-input"  
                                        />  
                                    </td>   
                                    <td>  
                                        <button  
                                            className="btn btn-save"  
                                            onClick={handleSave}  
                                        >  
                                            Save  
                                        </button>  
                                    </td>  
                                </>  
                            ) : (  
                                <>  
                                    <td>{book._id}</td>  
                                    <td>{book.name}</td>  
                                    <td>{book.author}</td>  
                                    <td>{book.price}</td>  
                                    <td>{book.rackNo}</td>  
                                    <td>{book.dateOfPurchase}</td>  
                                    <td>  
                                        <button  
                                            className="btn btn-edit"  
                                            onClick={() => handleEdit(book)}  
                                        >  
                                            Edit  
                                        </button>  
                                        <button  
                                            className="btn btn-delete"  
                                            onClick={() => handleDelete(book._id)}  
                                        >  
                                            Delete  
                                        </button>  
                                    </td>  
                                </>  
                            )}  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>  
    );  
};  

export default BooksPage;