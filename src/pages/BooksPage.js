import React, { useState, useEffect } from "react";  
import { Link, useNavigate } from "react-router-dom";  
import API from "../api";  
import "../styles/BookPage.css"; 

const BooksPage = () => {  
    const [books, setBooks] = useState([]);  
    const [loading, setLoading] = useState(true);   
    const navigate = useNavigate();  

    // Fetch books from the API  
    useEffect(() => {  
        fetchBooks();  
    }, []);  

    const fetchBooks = async () => {  
        try {  
            const response = await API.get("/books");  
            setBooks(response.data);  
        } catch (error) {  
            console.error("Error fetching books:", error);  
            alert("Failed to load books. Please try again later.");  
        } finally {  
            setLoading(false);  
        }  
    };  

    // Delete a book by ID  
    const deleteBook = async (id) => {  
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");  
        if (!confirmDelete) return;  

        try {  
            await API.delete(`/books/${id}`);  
            setBooks(previousBooks => previousBooks.filter((book) => book._id !== id));  
            alert("Book deleted successfully!");  
        } catch (error) {  
            console.error("Error deleting book:", error);  
            alert("Failed to delete book. Please try again.");  
        }  
    };  

    // Navigate to edit page  
    const editBook = (id) => {  
        navigate(`/edit/${id}`);  
    };  

    if (loading) {  
        return <div className="text-center">Loading books...</div>;  
    }  

    return (  
        <div className="container mt-4">  
            <h1 className="mb-4">Books List</h1>  
            <Link to="/add" className="btn btn-primary mb-3">  
                Add New Book  
            </Link>  
            <table className="table table-striped">  
                <thead>  
                    <tr>  
                        <th>ID</th>  
                        <th>Title</th>  
                        <th>Author</th>  
                        <th>Actions</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {books.length > 0 ? (  
                        books.map((book) => (  
                            <tr key={book._id}>  
                                <td>{book._id}</td>  
                                <td>{book.name}</td>  
                                <td>{book.author}</td>  
                                <td>  
                                    <button  
                                        className="btn btn-warning me-2"  
                                        onClick={() => editBook(book._id)}  
                                    >  
                                        Edit  
                                    </button>  
                                    <button  
                                        className="btn btn-danger"  
                                        onClick={() => deleteBook(book._id)}  
                                    >  
                                        Delete  
                                    </button>  
                                </td>  
                            </tr>  
                        ))  
                    ) : (  
                        <tr>  
                            <td colSpan="4" className="text-center">  
                                No books found.  
                            </td>  
                        </tr>  
                    )}  
                </tbody>  
            </table>  
        </div>  
    );  
};  

export default BooksPage;