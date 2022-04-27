const express = require("express");
const router = express.Router();
const Helmet = require("../models/helmet");

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

//Getting all helmets
router.get("/", async (req, res) => {
  try {
    const helmets = await Helmet.find();
    res.json(helmets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one helmet
router.get("/:id", getHelmet, (req, res) => {
  res.json(res.helmet);
});

async function getHelmet(req, res, next) {
  let helmet;
  try {
    helmet = await Helmet.findById(req.params.id);
    if (helmet == null) {
      return res.status(404).json({ message: "Cannot find helmet" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.helmet = helmet;
  next();
}

module.exports = router;
