const express = require('express')

const router = express.Router();

const {
    getUsers,
    addUser,
    borrowBook,
    returnBorrowedBook,
    filterUsers
  } = require('../controllers/usersController');
const { paginate } = require('../middleware/pagination');

router.get('/', filterUsers, paginate, getUsers);

router.post('/', addUser);

router.put('/:id/borrow', borrowBook);

router.put('/:id/return', returnBorrowedBook);


module.exports = router