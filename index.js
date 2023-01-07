const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");

const userRoutes = require("./routes/user");
const reportRoutes = require("./routes/report");
const Image = require("./models/Image");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

// Storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

app.get("/", async (req, res) => {
  res.status(200).json("Welcome to my API");
});

// Middleware upload image
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new Image({
        image: {
          data: req.file.filename,
          contentType: "image/jpeg",
        },
      });
      try {
        newImage.save();
        console.log(`Image ${newImage.fil}`);
        res.status(200).send("Upload success.");
      } catch (error) {
        console.log(error);
        res.status(500).send("Error in da Server");
      }
    }
  });
});

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`backend server started on port ${PORT}`);
  mongoose
    .connect(process.env.MONGODB)
    .then((result) => console.log("mongodb connected"))
    .catch((error) => console.log(error));
});
