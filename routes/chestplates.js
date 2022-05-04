//require express for routing and chestplate schema
const express = require("express");
const router = express.Router();
const Chestplate = require("../models/chestplate");

//setup CORS access
router.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PATCH, POST, PUT, DELETE, GET, OPTIONS"
  );
  res.header("Access-Control-Request-Method", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//Getting all chestplates
router.get("/", async (req, res) => {
  try {
    const chestplates = await Chestplate.find();
    res.json(chestplates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one chestplate
router.get("/:id", getChestplate, (req, res) => {
  res.json(res.chestplate);
});

//function to get one chestplate
async function getChestplate(req, res, next) {
  let chestplate;
  try {
    chestplate = await Chestplate.findById(req.params.id);
    if (chestplate == null) {
      return res.status(404).json({ message: "Cannot find chestplate" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.chestplate = chestplate;
  next();
}

module.exports = router;
