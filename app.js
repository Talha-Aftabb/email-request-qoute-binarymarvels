const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mailsRoute = require("./routes/mails");
const userRoute = require("./routes/user");
const cors = require("cors");
require("dotenv/config");
// cors for the runnnig the localhost
app.use(cors()); // Use this after the variable declaration
app.use(bodyParser.json());
//Importing routes
app.use("/mail", mailsRoute);
app.use("/user", userRoute);
//on page routing
app.get("/", (_req, res) => {
	res.send("We Are On Home");
});

app.listen(process.env.PORT || 3000);
