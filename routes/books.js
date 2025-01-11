const express = require("express");

const router = express();

const {
  getAllBooks,
  getBookById,
  postBookData,
} = require("../controllers/bookController");


router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", postBookData);

module.exports = router;
