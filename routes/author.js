const express = require("express");

const router = express.Router();

const {
  getAuthors,
  addAuthor,
  getAuthorById,
  filterAuthors
} = require("../controllers/authorController");
const { authenticateToken, authRole } = require("../middleware/auth");
const { paginate } = require("../middleware/pagination");

router.get("/", filterAuthors, paginate, getAuthors);

router.post("/", authenticateToken, authRole('admin'), addAuthor);

router.get("/:id", getAuthorById);

module.exports = router;
