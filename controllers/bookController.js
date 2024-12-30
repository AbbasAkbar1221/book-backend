const Book = require('../models/bookSchema')

async function getAllBooks (req, res) {
    console.log(req.method);
    console.log(req.url);
    console.log(req.query);
  
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unable to fetch books from the database" });
    }
  }

  async function getBookById(req, res) {
    console.log(req.method);
    console.log(req.url);
    console.log("Fetching:", req.params.id);
    console.log(req.query);
    try {
      const book = await Book.findById(req.params.id);
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Unable to fetch book from the database" });
    }
  }

  async function postBookData (req, res){
    console.log(req.method);
    console.log(req.body);
  
    try {
      // const acknowledgement = await Book.create(req.body);
      // res.json(acknowledgement);
  
      const newBook = new Book(req.body);
      const book = await newBook.save();
      res.json(book);
  
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "unable to open a file while writing on server" });
      return;
    }
  }

  async function updateBookData (req, res) {
    console.log(req.method);
    console.log(req.url);
    console.log("Editing:", req.params.id);
    console.log(req.body);
  
  
    try {
      let result = await Book.findByIdAndUpdate(req.params.id, req.body,
          {
              new: true
          }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to modify book data" });
      return;
    }
  }

  async function deleteBookData (req, res) {
    console.log(req.method);
    console.log(req.url);
    console.log("Deleting:", req.params.id);
  
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      res.json(book);
    } catch (error) {
      console.error(err);
      res.status(500).json({ message: "Unable to delete book data" });
      return 
    }
  }

  module.exports={
    getAllBooks,
    getBookById,
    postBookData,
    updateBookData,
    deleteBookData
  }