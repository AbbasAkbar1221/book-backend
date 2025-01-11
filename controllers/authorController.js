const Author = require('../models/author')

async function getAuthors(req, res){
    try {
      const authors = await Author.find().populate(
        "books",
        "title price genres publicationYear"
      );
      res.json(authors);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unable to fetch authors from the database" });
    }
}

async function addAuthor(req, res){
    try {
      const newAuthor = await new Author(req.body);
      const result = await newAuthor.save();
      res.status(201).json(result);
    } catch (error) {
      console.error(err);
      res.status(500).json({ message: "Failed to add new author" });
      return;
    }
  }

  async function getAuthorById(req, res){
    try {
      const author = await Author.findById(req.params.id);
      res.json(author);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unable to fetch author from the database" });
    }
  }

  module.exports = {
    getAuthors,
    addAuthor,
    getAuthorById
  }