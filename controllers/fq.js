const facultyInfo = require("../models/faculty_Info");
const Sfr = require("../models/sfr");

module.exports.renderform = async (req, res) => {
  const FacultyInfo = await facultyInfo.find({ owner: req.user._id });
  if (!FacultyInfo[0]) {
    return res.render("fq");
  } else {
    res.redirect("/fqinfo");
  }
};

module.exports.registerFormData = async (req, res) => {
  const {
    phdCAY,
    phdCAYm1,
    phdCAYm2,
    mtechCAY,
    mtechCAYm1,
    mtechCAYm2,
    regularCAYm1,
    facultyRetained,
  } = req.body;

  const id = req.user._id;
  const sfr = await Sfr.find({
    owner: id,
  });

  const FacultyInfo = new facultyInfo(req.body);
  FacultyInfo.owner = id;
  const f20CAY = Math.round(sfr[0].totalStudentsCAY / 20);
  const f20CAYm1 = Math.round(sfr[0].totalStudentsCAYm1 / 20);
  const f20CAYm2 = Math.round(sfr[0].totalStudentsCAYm2 / 20);
  FacultyInfo.F20CAY = f20CAY;
  FacultyInfo.F20CAYm1 = f20CAYm1;
  FacultyInfo.F20CAYm2 = f20CAYm2;
  FacultyInfo.FQCAY = 2.0 * ((10 * phdCAY + 4 * mtechCAY) / f20CAY);
  FacultyInfo.FQCAYm1 = 2.0 * ((10 * phdCAYm1 + 4 * mtechCAYm1) / f20CAYm1);
  FacultyInfo.FQCAYm2 = 2.0 * ((10 * phdCAYm2 + 4 * mtechCAYm2) / f20CAYm2);
  FacultyInfo.percentRetained = (facultyRetained / regularCAYm1) * 100;
  await FacultyInfo.save();
  res.redirect("/fqinfo");
};

module.exports.fqinfo = async (req, res) => {
  const id = req.user._id;
  const FacultyInfo = await facultyInfo.find({
    owner: id,
  });

  res.render("fqinfo", { FacultyInfo });
};

module.exports.editinfo = async (req, res) => {
  const id = req.user._id;
  const FacultyInfo = await facultyInfo.find({
    owner: id,
  });
  res.render("fqedit", { FacultyInfo });
};

module.exports.updateinfo = async (req, res) => {
  const {
    phdCAY,
    phdCAYm1,
    phdCAYm2,
    regularCAYm1,
    mtechCAY,
    mtechCAYm1,
    mtechCAYm2,
    facultyRetained,
  } = req.body;
  const id = req.user._id;
  const sfr = await Sfr.find({
    owner: id,
  });

  const owner = { owner: id };
  const FacultyInfo = await facultyInfo.findOneAndUpdate(owner, req.body);

  const f20CAY = Math.round(sfr[0].totalStudentsCAY / 20);
  const f20CAYm1 = Math.round(sfr[0].totalStudentsCAYm1 / 20);
  const f20CAYm2 = Math.round(sfr[0].totalStudentsCAYm2 / 20);
  FacultyInfo.F20CAY = f20CAY;
  FacultyInfo.F20CAYm1 = f20CAYm1;
  FacultyInfo.F20CAYm2 = f20CAYm2;
  FacultyInfo.FQCAY = 2.0 * ((10 * phdCAY + 4 * mtechCAY) / f20CAY);
  FacultyInfo.FQCAYm1 = 2.0 * ((10 * phdCAYm1 + 4 * mtechCAYm1) / f20CAYm1);
  FacultyInfo.FQCAYm2 = 2.0 * ((10 * phdCAYm2 + 4 * mtechCAYm2) / f20CAYm2);
  FacultyInfo.percentRetained = (facultyRetained / regularCAYm1) * 100;

  await FacultyInfo.save();

  res.redirect("/fqinfo");
};
