const InstitutionalInfo = require("../models/Institutional_Info");
const User = require("../models/user");

module.exports.renderform = async (req, res) => {
  res.render("RegistrationForm");
};

module.exports.registerFormData = async (req, res) => {
  const {
    name,
    address,
    university,
    estYear,
    institutionalType,
    ownershipStatus,
    vision,
    mission,
    headName,
    headEmail,
    headContact,
    nbaCoordinatorName,
    nbaCoordinatorEmail,
    nbaCoordinatorContact,
  } = req.body;
  const institutionalInfo = new InstitutionalInfo(req.body);
  institutionalInfo.owner = req.user._id;
  await institutionalInfo.save();
  const Info = await InstitutionalInfo.find({});
  //console.log(Info);
  res.redirect("/institutionalInfo");
};

module.exports.institutionalinfo = async (req, res) => {
  const id = req.user._id;
  const institutionalInfo = await InstitutionalInfo.find({
    owner: id,
  });
  // console.log(institutionalInfo);
  res.render("institutionalInfo", {
    institutionalInfo,
  });
};

module.exports.editinfo = async (req, res) => {
  const id = req.user._id;
  const institutionalInfo = await InstitutionalInfo.find({
    owner: id,
  });
  // console.log(institutionalInfo);
  res.render("editprofile", { institutionalInfo });
};

module.exports.updateinfo = async (req, res) => {
  const id = req.user._id;
  const owner = { owner: id };
  const institutionalInfo = await InstitutionalInfo.findOneAndUpdate(owner, req.body);
  res.redirect("/institutionalInfo");
}