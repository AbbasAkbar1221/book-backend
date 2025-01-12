const BorrowRecord = require("../models/bookRecord");
const User = require("../models/user");

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
async function getSpecificRecords(req, res) {
  const email = req.user.email; 

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const borrowRecords = await BorrowRecord.find({ user: user._id })
      .populate('book') 
      .populate('user');

    if (borrowRecords.length > 0) {
      res.status(200).json(borrowRecords);
    } else {
      res.status(404).json({ message: "No borrow records found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
}

module.exports = {
  getBorrowRecords,
  getSpecificRecords,
};
