const express = require("express");  
const bodyParser = require("body-parser");  
const dotenv = require("dotenv");  
const cors = require("cors");  
const connectDB = require("./db");  

const app = express();  
dotenv.config();  
connectDB();  

app.use(cors());  
app.use(bodyParser.json());  

// Define a root route  
app.get("/", (req, res) => {  
    res.send("Welcome to the API!");  
});  

// Routes  
const bookRoutes = require("./routes/books");  
app.use("/api/books", bookRoutes);  

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));