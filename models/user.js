const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      // validate: function (v) {
      //   const atSymbolIdx = v.indexOf("@");
      //   const dotIdx = v.lastIndexOf(".");
      //   return (
      //     atSymbolIdx > 0 && atSymbolIdx + 1 < dotIdx && dotIdx < v.length - 1
      //   );
      // },
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address.",
      },
    },
    borrowedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "BorrowRecord",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
