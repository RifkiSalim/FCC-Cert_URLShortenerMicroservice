// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routers
const apiRouter = require("./routes/api");

// Init app
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors({ optionsSuccessStatus: 200 }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Config Routers
app.use("/api", apiRouter);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
