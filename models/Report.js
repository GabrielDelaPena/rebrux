const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
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
    type: Number,
  },
  lng: {
    type: Number,
  },
  createdAt: {
    type: String,
    min: 6,
    max: 255,
  },
  timeCreated: {
    type: String,
  },
});

module.exports = mongoose.model("Report", reportSchema);
