const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      min: 6,
      max: 255,
    },
    username: {
      type: String,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      min: 6,
      max: 255,
    },
    street: {
      type: String,
      min: 6,
      max: 255,
    },
    city: {
      type: String,
      min: 6,
      max: 255,
    },
    zip: {
      type: String,
      min: 6,
      max: 255,
    },
    phone: {
      type: String,
      min: 6,
      max: 255,
    },
    points: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
