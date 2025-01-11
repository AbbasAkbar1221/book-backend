const express = require('express')

const router = express.Router();

const {
    getBorrowRecords
  } = require('../controllers/recordController')

router.get('/', getBorrowRecords);

module.exports = router