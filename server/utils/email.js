const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2025,
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMTP_PASS
    }
})

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: "<h1>Chatbook</h1>",
            to,
            subject,
            text
        })
    } catch(err) {
        console.log(`Error has been found ${err}`);
    }
}

module.exports = sendEmail;