const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mailsRoute = require("./routes/mails");
const cors = require("cors");
require("dotenv/config");
// cors for the runnnig the localhost
app.use(cors()); // Use this after the variable declaration
app.use(bodyParser.json());
//Importing routes
app.use("/mail", mailsRoute);
//on page routing
app.get("/", (req, res) => {
	res.send("We Are On Home");
});

app.listen(process.env.PORT || 3000);
