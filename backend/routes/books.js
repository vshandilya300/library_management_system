const express = require("express");  
const Book = require("../models/Book");  
const router = express.Router();  

// Get all books  
router.get("/", async (req, res) => {  
    try {  
        const books = await Book.find();  
        res.status(200).json(books);  
    } catch (error) {  
        console.error("Error fetching books:", error);  
        res.status(500).json({ success: false, message: "Error fetching books", error: error.message });  
    }  
});  

// Get a book by ID  
router.get("/:id", async (req, res) => {  
    try {  
        const bookId = req.params.id;  
        const book = await Book.findById(bookId);  

        if (!book) {  
            return res.status(404).json({ success: false, message: "Book not found" });  
        }  

        res.status(200).json(book);  
    } catch (error) {  
        console.error("Error fetching book:", error);  
        res.status(500).json({ success: false, message: "Error fetching book", error: error.message });  
    }  
});  

// Add a book  
router.post("/", async (req, res) => {  
    const { name, author, price, rackNo, edition, dateOfPurchase } = req.body;  

 
    if (!name || !author || price == null) {  
 
        return res.status(400).json({ success: false, message: "Name, author, and price are required." });  
    }  

    const newBook = new Book({ name, author, price, rackNo, edition, dateOfPurchase });  

    try {  
        const savedBook = await newBook.save();  
        res.status(201).json({ success: true, message: "Book added successfully", book: savedBook });  
    } catch (error) {  
        console.error("Error adding book:", error);  
        res.status(500).json({ success: false, message: "Error adding book", error: error.message });  
    }  
});  

// Update a book  
router.put("/:id", async (req, res) => {  
    const { name, author, price, rackNo, edition, dateOfPurchase } = req.body;  
    const bookId = req.params.id;  

    try {  
        const updatedBook = await Book.findByIdAndUpdate(  
            bookId,   
            { name, author, price, rackNo, edition, dateOfPurchase },  
            { new: true, runValidators: true } 
        );  

        if (!updatedBook) {  
            return res.status(404).json({ success: false, message: "Book not found" });  
        }  

        res.status(200).json({ success: true, message: "Book updated successfully", book: updatedBook });  
    } catch (error) {  
        console.error("Error updating book:", error);  
        res.status(500).json({ success: false, message: "Error updating book", error: error.message });  
    }  
});  

// Delete a book  
router.delete("/:id", async (req, res) => {  
    try {  
        const bookId = req.params.id;  
        const deletedBook = await Book.findByIdAndDelete(bookId);  

        if (!deletedBook) {  
            return res.status(404).json({ success: false, message: "Book not found" });  
        }  

        res.status(200).json({ success: true, message: "Book deleted successfully", deletedBook });  
    } catch (error) {  
        console.error("Error deleting book:", error);  
        res.status(500).json({ success: false, message: "Server Error", error: error.message });  
    }  
});  

// Export the router  
module.exports = router;