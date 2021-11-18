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
	[
		check("name").notEmpty().withMessage("Name cannot be empty"),
		check("email").notEmpty().withMessage("Email cannot be empty"),
	],
	async (req, res) => {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, name } = req.body;

		try {
			const userOptions = {
				from: "testemails@binarymarvels.com",
				to: [email],
				subject: "Message from binarymarvels ✔", // Subject line
				html: `<p>Hi ${name} <br /><br />

				I hope you are doing well. We have received your information regarding the website you required.  <br /><br />
				
				One of our contact person will call you shortly. For more information you can visit our website or email us. <br /><br />
				
				Regards.  <br /><br />
				
				Binary Marvels
				</p>`, // html body
			};
			transporter.sendMail(userOptions, function (err, info) {
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
