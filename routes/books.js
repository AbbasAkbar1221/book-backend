const express = require("express");

const router = express();

const {
  getAllBooks,
  getBookById,
  postBookData,
  updateBookData,
  deleteBookData,
} = require("../controllers/bookController");


router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", postBookData);

router.patch("/:id", updateBookData);

router.delete("/:id", deleteBookData);

module.exports = router;
