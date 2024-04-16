const User = require("../models/user");
const InstitutionalInfo = require("../models/Institutional_Info");

module.exports.renderUser = (req, res) => {
  res.render("user/register");
};

module.exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({
      email,
      username,
    });
    const registerUser = await User.register(user, password);
    // req.flash('success', `Welcome to Yelp Camp ${req.user.username}`);
    // console.log(req.body);
    res.redirect("/login");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("user/login");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "welcome back!");
  const id = req.user._id;
  const institutionalInfo = await InstitutionalInfo.find({ owner: id });
  if (!institutionalInfo[0]) {
    return res.redirect("/registerForm");
  } else {
    res.render("institutionalInfo", { institutionalInfo });
  }
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash("success", "GOODBYE!!");
  res.redirect("/");
};
