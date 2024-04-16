let nodemailer = require("nodemailer");
const { gmailCredentials } = require("../configuration/secret");

// let config = require("./config");
// let secret = require('../configuration/secret.js');

module.exports = (receivers, path) => {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(gmailCredentials);

  //receivers
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: "nikit.gokhe13@gmail.com", // sender address
    to: receivers, // list of receivers['1','2']
    subject: "RECEIVED YOUR REQUEST FOR NBA EXPERT CAMPUS VISIT", // Subject line
    html: "<p>Hello There,</p><p>We received your request for NBA Expert campus visit.</p><p>We got you! Our NBA expert will contact you as soon as possible</p><p>We are so happy to see your enthusiasm. Wish you best luck!!</p><br><p>Thanks and Regards</p><h2>Team Quick Accreditation</h2>", // html body
    secureConnection: true,
    port: 465,
  };

  if (path != undefined && path != null && path != "" && !Array.isArray(path)) {
    mailOptions.attachments = [
      {
        path: path,
      },
    ];
  } else if (
    path != undefined &&
    path != null &&
    path != "" &&
    Array.isArray(path)
  ) {
    mailOptions.attachments = path;
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (!error) {
      console.log(
        "Message sent: " + info.response + "-->" + receivers.toString()
      );
    } else {
      console.error("[Error while sending email] -->", error);
    }
  });
};
