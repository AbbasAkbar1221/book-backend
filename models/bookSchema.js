const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  author: { type: String, required: [true, "Author is required"] },
  publishedDate: {
    type: Date,
    validate: {
      validator: (value) => value <= new Date(),
    },
    default: Date.now,
  },
  genre: {
    type: String,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Science",
      "History",
      "Biography",
      "Other",
    ],
    default: "Other",
  },
  price: { type: Number, min: [0, "Price must be a positive number"] },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
