const express = require('express')

const router = express.Router();

const {
    getUsers,
    addUser,
    borrowBook,
    returnBorrowedBook
  } = require('../controllers/usersController')

router.get('/', getUsers);

router.post('/', addUser);

router.put('/:id/borrow', borrowBook);

router.put('/:id/return', returnBorrowedBook);


module.exports = router