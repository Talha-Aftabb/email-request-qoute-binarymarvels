const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
//For the mailing system
const transporter = nodemailer.createTransport({
  host: "binarymarvels.com",
  port: 465,
  secure: true,
  auth: {
    user: "testemails@binarymarvels.com",
    pass: "malik1997",
  },
});
//For the posting the content on the server
router.post("/", async (req, res) => {
  const from = req.body.mail;
  const subject = req.body.subject;
  const text = req.body.text;
  try {
    const options = {
      from: "testemails@binarymarvels.com",
      to:["malikmusa1997@gmail.com","info@binarymarvels.com",from],
      subject,
      text,
    };
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: err,
        });
      }
      res.status(200).json({
        message: info.response,
      });
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
