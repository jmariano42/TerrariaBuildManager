const express = require("express");
const router = express.Router();
const Accessory = require("../models/accessory");

//Getting all accessories
router.get("/", async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one accessory
router.get("/:id", getAccessory, (req, res) => {
  res.json(res.accessory);
});

async function getAccessory(req, res, next) {
  let accessory;
  try {
    accessory = await Accessory.findById(req.params.id);
    if (accessory == null) {
      return res.status(404).json({ message: "Cannot find accessory" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.accessory = accessory;
  next();
}

module.exports = router;
