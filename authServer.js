require("dotenv").config();

const express = require("express");

require('./mongoose_connection')

const app = express();

app.use(express.json());

const PORT_AUTH = process.env.PORT_AUTH;

const userAuthRoutes = require('./authRoutes/authRoutes')
app.use('/', userAuthRoutes)

app.listen(PORT_AUTH, () => {
  console.log(`Server is running at port ${PORT_AUTH}`);
});
