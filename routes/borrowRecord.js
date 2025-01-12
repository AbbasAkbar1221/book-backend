const express = require('express')

const router = express.Router();

const {
    getBorrowRecords,
    getSpecificRecords
  } = require('../controllers/recordController')

  const {authRole} = require('../middleware/auth')

router.get('/', authRole('admin'), getBorrowRecords);

router.get('/id', getSpecificRecords)

module.exports = router