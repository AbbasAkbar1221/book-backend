const Book = require("../models/bookSchema");
const Author = require("../models/author");

async function getAllBooks(req, res) {
  try {
    const books = await Book.find().populate("authors", "name nationality");
    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch books from the database" });
  }
}

async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id).populate(
      "authors",
      "name dateOfBirth nationality"
    );
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch book from the database" });
  }
}

async function postBookData(req, res) {
  console.log(req.method);
  console.log(req.body);
  const { title, price, authors, genres, publicationYear } = req.body;

  try {
    let authorIds = [];
    for (const author of authors) {
      let existingAuthor = await Author.findOne({ name: author.name });

      //check existing author
      if (!existingAuthor) {
        const newAuthor = new Author(author);
        existingAuthor = await newAuthor.save();
      }

      authorIds.push(existingAuthor._id);
    }

    const newBook = new Book({
      title,
      price,
      authors: authorIds,
      genres,
      publicationYear,
    });
    const book = await newBook.save();

    await Promise.all(
      authorIds.map((authorId) => {
        Author.findByIdAndUpdate(authorId, { $addToSet: { books: book._id } });
      })
    );
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add new book" });
    return;
  }
}
module.exports = {
  getAllBooks,
  getBookById,
  postBookData,
};
