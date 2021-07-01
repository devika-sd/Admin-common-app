const Book = require('../../models/book');
const asyncHandler = require('../../middleware/async');
const bcrypt = require('bcrypt');


const fetchAllBook = asyncHandler(async (req, res) => {

    res.status(200).json(res.advancedResults)
})

const addBook = asyncHandler(async (req, res, next) => {
    //Operatons on model

    let book = await Book.create(req.body);

    if(!book) res.json({ success: false, message:"Book is not added" });
    else res.status(201).json({ success: true, data: book,message:"Book is added successfully" });
})

const deleteBooksByTitle = asyncHandler(async (req, res, next) => {

    let bookDel = await Book.findOneAndDelete({ title: req.params.title })

    if (!bookDel) throw new Error(`Book Title(${req.params.title}) is not found`)
    res.status(200).json({ success: true, data: bookDel,message:"Book is deleted successfully" })

})

const fetchBooksByTitle = asyncHandler(async (req, res, next) => {

    const books = await Book.findOne({ title: req.params.title })

    if (!bookDel) throw new Error(`Book Title(${req.params.title}) is not found`)
    res.status(200).json({ success: true, data: bookDel,message:"Book is found" })

})

const updateBookDetails = asyncHandler(async (req, res, next) => {
    const books = await Book.findOne({title:req.params.title});
   
        books.title= req.body.title;
        books.category= req.body.category;
        books.isbn = req.body.isbn;
        books.authors = req.body.authors;
        books.price = req.body.price;
        books.discount = req.body.discount;
        books.available = req.body.available;
        books.publishDate = req.body.publishDate;
    
        await books.save().then(saved=>{
          
            if(saved===books)
            {
                res.json({ success: true, data: [books],message:"Book details updated successfully" });
            }
            else
            {
                res.json({ success: false, message:"Book details not updated" });
            }
        });
        
});
module.exports = {addBook, fetchAllBook, deleteBooksByTitle, updateBookDetails, fetchBooksByTitle};