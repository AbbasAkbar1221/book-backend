const BorrowRecord = require("../models/bookRecord");

async function getBorrowRecords(req, res) {
  try {
    const borrowRecords = await BorrowRecord.find().populate("book user");
    res.status(201).json(borrowRecords);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch book records from the database" });
  }
}

module.exports = {
    getBorrowRecords,
  };