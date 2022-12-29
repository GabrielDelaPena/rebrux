const { Double } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    creator: {
      type: String,
      min: 6,
      max: 255,
    },
    image: {
      type: String,
      min: 6,
      max: 500,
    },
    description: {
      type: String,
      min: 6,
      max: 600,
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
    cleaned: {
      type: Boolean,
    },
    lat: {
      type: mongoose.Double,
    },
    lng: {
      type: mongoose.Double,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
