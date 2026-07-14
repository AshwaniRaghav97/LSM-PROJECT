import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"CodeLearn LMS" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent Successfully");
    console.log(info.response);

  } catch (error) {
    console.log("❌ Email Error");
    console.log(error);
    throw error;
  }
};

export default sendEmail;