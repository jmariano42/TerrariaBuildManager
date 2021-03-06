//require mongoose
const mongoose = require("mongoose");

//schema for User
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  builds: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
