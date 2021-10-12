const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mailsRoute = require("./routes/mails");

require("dotenv/config");

app.use(bodyParser.json());
//Importing routes
app.use("/mail", mailsRoute);
//on page routing
app.get("/", (req, res) => {
  res.send("We Are On Home");
});

app.listen(process.env.port||3000);
