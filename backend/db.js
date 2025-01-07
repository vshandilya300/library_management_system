const mongoose = require('mongoose');  

const connectDB = async () => {  
    try {  
        await mongoose.connect('mongodb+srv://vshandilya300:vishal300@cluster0.sovm2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Database connected successfully.");  
    } catch (error) {  
        console.error("Database connection failed:", error);  
    }  
};  

module.exports = connectDB;