const express = require("express");

const router = express.Router();

const {
  getAuthors,
  addAuthor,
  getAuthorById,
} = require("../controllers/authorController");

router.get("/", getAuthors);

router.post("/", addAuthor);

router.get("/:id", getAuthorById);

module.exports = router;
