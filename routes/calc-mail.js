const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
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
router.post(
	"/",
	// [
	// 	check("page").notEmpty().withMessage("page cannot be empty"),
	// 	check("scheduling").notEmpty().withMessage("scheduling cannot be empty"),
	// 	check("blog").notEmpty().withMessage("blog cannot be empty"),
	// 	check("hosting").notEmpty().withMessage("hosting cannot be empty"),
	// 	check("total").notEmpty().withMessage("total cannot be empty"),
	// 	check("name").notEmpty().withMessage("name cannot be empty"),
	// 	check("email").notEmpty().withMessage("email cannot be empty"),
	// 	check("phone").notEmpty().withMessage("phone Number cannot be empty"),
	// ],
	async (req, res) => {
		console.log(req.body);
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const html = req.body.html;

		try {
			const mailOptions = {
				from: "testemails@binarymarvels.com",
				to: ["malikmusa1997@gmail.com", "info@binarymarvels.com"],
				subject: "Message from binarymarvels ✔", // Subject line
				html, // html body
			};
			transporter.sendMail(mailOptions, function (err, info) {
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
	}
);

module.exports = router;
