const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number },
    rackNo: { type: String },
    status: { type: String, default: "available" },
    dateOfPurchase: { type: Date },
});

module.exports = mongoose.model("Book", bookSchema);
