const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    console.log("Ia m receiver"); // This log statement can help you debug
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: receiverEmail,
      subject: subject,
      html: body
    });
    console.log("Email sent successfully"); // Log for confirmation
  } catch (error) {
    console.error("Error sending email:", error); // Log any errors
    throw error; // Optionally rethrow to handle it later
  }
};

