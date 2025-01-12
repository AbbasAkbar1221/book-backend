const express = require("express");

const router = express();

const {
  getAllBooks,
  getBookById,
  postBookData,
  filterBooks,
} = require("../controllers/bookController");
const { authRole } = require("../middleware/auth");
const { paginate } = require("../middleware/pagination");


router.get("/", filterBooks, paginate, getAllBooks);

router.get("/:id", getBookById);

router.post("/", authRole('admin'), postBookData);

module.exports = router;
