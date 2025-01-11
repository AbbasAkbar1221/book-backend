const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
    genres: {
      type: [String],
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
    publicationYear: {
      type: Number,
      required: [true, "Publication year is required"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
