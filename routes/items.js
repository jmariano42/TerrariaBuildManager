const express = require("express");
const router = express.Router();
const Item = require("../models/item");

//Getting all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one item
router.get("/:id", getItem, (req, res) => {
  res.json(res.item);
});

//Creating one item
router.post("/", async (req, res) => {
  const item = new Item({
    _id: req.body._id,
    name: req.body.name,
    stats: req.body.stats,
    craftable_after: req.body.craftable_after,
    image: req.body.image,
    itemID: req.body.itemID,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one item
router.patch("/:id", getItem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.stats != null) {
    res.item.stats = req.body.stats;
  }
  if (req.body.craftable_after != null) {
    res.item.craftable_after = req.body.craftable_after;
  }
  if (req.body.image != null) {
    res.item.image = req.body.image;
  }
  if (req.body.itemID != null) {
    res.item.itemID = req.body.itemID;
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.stats(400).json({ message: err.message });
  }
});

//Deleting one item
router.delete("/:id", getItem, async (req, res) => {
  try {
    await res.item.remove();
    res.json({ message: "Deleted item" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.item = item;
  next();
}

module.exports = router;
