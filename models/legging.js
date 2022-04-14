const mongoose = require("mongoose");

const leggingSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
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
    required: true,
  },
  itemID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("legging", leggingSchema);
