const express = require("express");

const router = express();

const {
  getAllBooks,
  getBookById,
  postBookData,
} = require("../controllers/bookController");
const { authRole } = require("../middleware/auth");


router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", authRole('admin'), postBookData);

module.exports = router;
