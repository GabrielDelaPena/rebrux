const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (msgOptions) => {
  try {
    await sgMail.send(msgOptions);
    console.log("Message sent successfully!");
  } catch (error) {
    console.log(error);

    if (error.response) {
      console.log(error.response.body);
    }
  }
};

module.exports.sendMail = sendMail;
