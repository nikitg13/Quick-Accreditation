require("dotenv").config();

module.exports = {
  gmailCredentials: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  },
};
