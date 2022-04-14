const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
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
  armorID: {
    type: Number,
    required: false,
  },
  itemID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("item", itemSchema);
