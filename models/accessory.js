//require mongoose
const mongoose = require("mongoose");

//schema for accessory
const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stats: {
    type: Object,
    required: true,
  },
  craftable_after: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  itemID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("accessory", accessorySchema);
