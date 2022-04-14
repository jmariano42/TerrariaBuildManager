const express = require("express");
const router = express.Router();
const Legging = require("../models/legging");

//Getting all leggings
router.get("/", async (req, res) => {
  try {
    const leggings = await Legging.find();
    res.json(leggings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one legging
router.get("/:id", getLegging, (req, res) => {
  res.json(res.legging);
});

async function getLegging(req, res, next) {
  let legging;
  try {
    legging = await Legging.findById(req.params.id);
    if (legging == null) {
      return res.status(404).json({ message: "Cannot find helmet" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.legging = legging;
  next();
}

module.exports = router;
