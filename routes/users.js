const express = require("express");
const router = express.Router();
const User = require("../models/user");

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

router.all("/:id", function (req, res, next) {
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

//Getting all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one user
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//Creating one user
router.post("/", async (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    builds: req.body.builds,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one user
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.first_name != null) {
    res.user.first_name = req.body.first_name;
  }
  if (req.body.last_name != null) {
    res.user.last_name = req.body.last_name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.builds != null) {
    res.user.builds = req.body.builds;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.stats(400).json({ message: err.message });
  }
});

//Deleting one user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
