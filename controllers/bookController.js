//const data1 = require('../data/data-1');
//const booksData = require('../data/data-1');

//summoning book model instead of above code
const Book = require('../models/bookModel');


const getAllBooks = async (request, response, next) => {
    try {
        if(200) {
            await Book.find({}).then((books)=>
            response.status(200).json({
                success:{message: "Found all books!"}, 
                data: books,
                statusCode: 200,
        }))
        }
    } catch (error) {
        response.status(400).json({
            error:{message: "Something went wrong with getting all the books!"},
            statusCode: 400,
        })
    }
};

const getBook = async (request, response, next)=>{
    const id = request.params;
    // const foundBook = booksData.find(book => book.id === Number(id));

    try {
        if (200){
            await Book.find({_id: id}).then((foundBook)=> {
                response.status(200).json({
                    success:{message: "Found the book you are looking for!"},
                    data: foundBook,
                    statusCode:200,
                })
            })
            
        }
    } catch (error) {
        response.status(400).json({
            error:{message:"Something went wrong retrieving a book!"},
            statusCode:400,
        })
    }
};

const createBook = async (request, response, next)=>{
    const {id, title, author, publisher, genre, pages, rating, synopsis} = request.body;
    const newBook = newBook({id, title, author, publisher, genre, pages, rating, synopsis});

    try {
       await newBook.save();
       response.status(201).json({
        success: {message: "A new book is created"},
        data:newBook,
        statusCode:201,
       })
 
    } catch (error) {
        response.status(400).json({
            error:{message: "Something went wrong creating a book"},
            statusCode:400,
        })
    }
};

const editBook = async (request, response, next) =>{
    const {id} = request.params;
    const {title, author, publisher, genre, pages, rating, synopsis} = request.body;

    try {Book.findByIdAndUpdate(id,{$set: {
        title,
        author,
        publisher,
        genre,
        pages,
        rating,
        synopsis
        }, 
    }, {new:true});
        await 
        response.status(201).json({
            success:{message:"Book is updated"},
            data:newBook,
            statusCode:201,
        })
    } catch (error) {
        response.status(400).json({
            error:{message: "Something went wrong while editing the book"},
            statusCode:400,
        })
    }    
};

const deleteBook = async (request, response, next) => {
    const {id} = request.params;
    try {
        await Book.findByIdAndDelete(id);
        response.status(200).json({
            success: {message: "Book deleted successfully!"},
            statusCode: 200,
        })
    } catch (error) {
        response.status(400).json({
            error: {message: "Something went wrong while deleting the book"},
            statusCode: 400,
        })
    }
};

module.exports = {getAllBooks, getBook, createBook, editBook, deleteBook}; 