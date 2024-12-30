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
    
      let updatedBook = await Book.findOneAndUpdate(
        {title: req.params.title},
        req.body,
        {new : true}
      )

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(updatedBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unable to update book data" });
      return;
    }
  }

  async function deleteBookData (req, res) {
    console.log(req.method);
    console.log(req.url);
    console.log("Deleting:", req.params.id);
  
    try {
      await Book.findOneAndDelete({title: req.params.title});
      res.status(200).json({ message: "Delete Successful" });
    } catch (error) {
      console.error(err);
      res.status(500).json({ message: "Unable to delete book data" });
      return 
    }
  }

  async function getBooksByGenre(req, res){
    try {
      const bookByGenre = await Book.find({genre: req.params.genre})
      res.status(200).json(bookByGenre)
    } catch (error) {
      console.error(error)
      res.json({message: "Unable to filter list using genre"})
    }
  }

  module.exports={
    getAllBooks,
    getBookById,
    postBookData,
    updateBookData,
    deleteBookData,
    getBooksByGenre
  }