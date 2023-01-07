const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const userRoutes = require("./routes/user");
const reportRoutes = require("./routes/report");

const app = express();
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(multer({ storage: storage }).single("image"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
  res.status(200).json("Welcome to my API");
});

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// app.post("/upload", upload.single("image"), (req, res) => {
//   // The image is saved in the 'uploads' folder
//   const image = req.file;
//   res.sendStatus(200);
// });

app.listen(PORT, () => {
  console.log(`backend server started on port ${PORT}`);
  mongoose
    .connect(process.env.MONGODB)
    .then((result) => console.log("mongodb connected"))
    .catch((error) => console.log(error));
});
