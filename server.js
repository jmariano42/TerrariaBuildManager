//require .env file for database url
require("dotenv").config();

//require express and mongoose
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connect to mongoose database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

//accessories router
const accessoriesRouter = require("./routes/accessories");
app.use("/accessories", accessoriesRouter);

//chestplates router
const chestplatesRouter = require("./routes/chestplates");
app.use("/chestplates", chestplatesRouter);

//helmets router
const helmetsRouter = require("./routes/helmets");
app.use("/helmets", helmetsRouter);

//leggings router
const leggingsRouter = require("./routes/leggings");
app.use("/leggings", leggingsRouter);

//users router
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

//start server
app.listen(3000, () => console.log("Server Started"));
