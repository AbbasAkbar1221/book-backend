const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

require('./mongoose_connection')
const Book = require('./models/bookSchema')

const app = express();

app.use(express.json());

app.get("/", async(req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.query);
  const results = await Book.find()
  res.json(results);
});


const bookRouter = require("./routes/books");
const authorRouter = require("./routes/author")
const userRouter = require("./routes/users")
const borrowRecordRouter = require("./routes/borrowRecord")

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/users", userRouter);
app.use("/borrow-records", borrowRecordRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
