require("dotenv").config();

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const routes = require("./routes");
const mongoose = require("mongoose");

const app = express();

/**
 * Database setup
 */
mongoose.connect(process.env.MONGO_URL);

// o express vai conseguir lidar o body das reqs vindo no formato json
app.use(express.json());

// o express vai conseguir lidar com reqs vindas no padrão urlencoded
app.use(express.urlencoded({ extended: true }));

// lib de log
app.use(morgan("dev"));

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads")),
);

app.use(routes);

app.listen(3000);
