const User = require("../models/user");
const Book = require("../models/bookSchema");
const BorrowRecord = require("../models/bookRecord");

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch authors from the database" });
  }
}

async function addUser(req, res) {
  try {
    const newUser = await new User(req.body);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add new user" });
    return;
  }
}

async function borrowBook(req, res) {
  const userId = req.params.id;
  const { bookId, dueDate } = req.body;
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const existingBorrow = await BorrowRecord.findOne({
      book: bookId,
      dueDate,
    });

    if (existingBorrow) {
      return res.status(400).json({ message: "Book is already borrowed" });
    }

    const borrowBook = new BorrowRecord({
      user: userId,
      book: bookId,
      dueDate,
    });

    await borrowBook.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { borrowedBooks: borrowBook._id } },
      { new: true }
    );

    const populatedBorrowRecord = await BorrowRecord.findById(borrowBook._id)
      .populate("user", "name email")
      .populate("book", "title price");

    res.status(200).json(populatedBorrowRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to borrow book", error });
  }
}

async function returnBorrowedBook(req, res) {
  const userId = req.params.id;
  const { bookId } = req.body;
  try {
    const borrowedBook = await BorrowRecord.findOne({
      user: userId,
      book: bookId,
      returnDate: null
    });

    if (!borrowedBook) {
      return res.status(404).json({ message: "No active borrow record found" });
    }

    borrowedBook.returnDate = new Date();
    await borrowedBook.save();
    res.status(200).json({ message: "Book returned successfully", borrowedBook });
  } catch (error) {
    res.status(500).json({ message: "Failed to return book", error});
  }
}

module.exports = {
  getUsers,
  addUser,
  borrowBook,
  returnBorrowedBook,
};
