const express = require("express");
const router = express.Router();
const user = require("../models/user");
const passport = require("passport");
const institutionInfo = require("../controllers/institutionalInfo");
const { isLoggedIn } = require("../middleware");

router.get("/registerForm", isLoggedIn, institutionInfo.renderform);

router.post("/registerForm", isLoggedIn, institutionInfo.registerFormData);

router.get("/institutionalInfo", isLoggedIn, institutionInfo.institutionalinfo);

router.get("/editprofile", isLoggedIn, institutionInfo.editinfo);

router.put("/editprofile", isLoggedIn, institutionInfo.updateinfo);

//router.post("/editprofile", );

module.exports = router;
