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

		const { from, name } = req.body;

		try {
			const userOptions = {
				from: "testemails@binarymarvels.com",
				to: [from],
				subject: "Message from binarymarvels ✔", // Subject line
				html: `<p>Hello ${name}, hope you are doing great.
				Thanks for requesting a free consultation, we have received your request and one of our representator will contact you soon.
				In the meantime you can know more about us by downloading the PDF below
				Regards;
				Binary Marvels Team
				</p>`, // html body
				attachments: [
					{
						filename: "attachment.pdf",
						path: "./attachment.pdf",
					},
				],
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
