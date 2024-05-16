 const mongoose = require("mongoose");

const {Schema} = mongoose;

 const  bookSchema = new Schema ({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    publisher: {
        type: String,
    },
    genre: {
        type: String,
    },
    pages: {
        type: Number,
    },
    rating: {
        type: Number,
    }, 
    synopsis: {
        type: String,
    },
 });

 const Book = mongoose.model("Book", bookSchema);

 module.exports = Book;