const express = require("express");

const router = express();

const {
  getAllBooks,
  getBookById,
  postBookData,
  updateBookData,
  deleteBookData,
  getBooksByGenre,
} = require("../controllers/bookController");


router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", postBookData);

router.put("/:title", updateBookData);

router.delete("/:title", deleteBookData);

router.get('/genre/:genre', getBooksByGenre)

module.exports = router;
