const express = require("express");

const router = express.Router();

const {
  getAuthors,
  addAuthor,
  getAuthorById,
} = require("../controllers/authorController");
const { authenticateToken, authRole } = require("../middleware/auth");

router.get("/", getAuthors);

router.post("/", authenticateToken, authRole('admin'), addAuthor);

router.get("/:id", getAuthorById);

module.exports = router;
