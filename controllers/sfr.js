const Sfr = require("../models/sfr");

module.exports.renderform = async (req, res) => {
  const sfr = await Sfr.find({ owner: req.user._id });
  if (!sfr[0]) {
    return res.render("sfr");
  } else {
    res.redirect("/sfrinfo");
  }
};

module.exports.registerFormData = async (req, res) => {
  const {
    u1,
    u2,
    u3,
    p1,
    p2,
    totalFacultyCAY,
    totalStudentsCAYm1,
    totalFacultyCAYm1,
    totalStudentsCAYm2,
    totalFacultyCAYm2,
  } = req.body;

  const totalStudents =
    Number(u1) + Number(u2) + Number(u3) + Number(p1) + Number(p2);

  const sfr = new Sfr(req.body);
  sfr.owner = req.user._id;

  sfr.totalStudentsCAY = totalStudents;

  const SFRCAY = Number(totalStudents) / Number(totalFacultyCAY);
  const SFRCAYm1 = Number(totalStudentsCAYm1) / Number(totalFacultyCAYm1);
  const SFRCAYm2 = Number(totalStudentsCAYm2) / Number(totalFacultyCAYm2);
  sfr.SFRCAY = Math.round(SFRCAY);
  sfr.SFRCAYm1 = Math.round(SFRCAYm1);
  sfr.SFRCAYm2 = Math.round(SFRCAYm2);

  sfr.AvgSFR = Math.round((SFRCAY + SFRCAYm1 + SFRCAYm2) / 3);

  await sfr.save();

  res.redirect("/sfrinfo");
};

module.exports.sfrinfo = async (req, res) => {
  const id = req.user._id;
  const sfrInfo = await Sfr.find({
    owner: id,
  });
  res.render("sfrinfo", { sfrInfo });
};

module.exports.editinfo = async (req, res) => {
  const id = req.user._id;
  const sfrInfo = await Sfr.find({
    owner: id,
  });
  res.render("sfredit", { sfrInfo });
};

module.exports.updateinfo = async (req, res) => {
  const id = req.user._id;

  const {
    u1,
    u2,
    u3,
    p1,
    p2,
    totalFacultyCAY,
    totalStudentsCAYm1,
    totalFacultyCAYm1,
    totalStudentsCAYm2,
    totalFacultyCAYm2,
  } = req.body;

  const owner = { owner: id };

  const sfrInfo = await Sfr.findOneAndUpdate(owner, req.body);

  // const totalStudents =
  //   Number(u1) + Number(u2) + Number(u3) + Number(p1) + Number(p2);

  // sfrInfo.totalStudentsCAY = Number(totalStudents);

  // let SFRCAY = Number(totalStudents) / Number(totalFacultyCAY);
  // let SFRCAYm1 = Number(totalStudentsCAYm1) / Number(totalFacultyCAYm1);
  // let SFRCAYm2 = Number(totalStudentsCAYm2) / Number(totalFacultyCAYm2);
  // sfrInfo.SFRCAY = SFRCAY;
  // sfrInfo.SFRCAYm1 = SFRCAYm1;
  // sfrInfo.SFRCAYm2 = SFRCAYm2;

  // sfrInfo.AvgSFR = (SFRCAY + SFRCAYm1 + SFRCAYm2) / 3;

  await sfrInfo.save();

  res.redirect("/sfrinfo");
};
