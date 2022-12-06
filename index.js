const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Home URL");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
