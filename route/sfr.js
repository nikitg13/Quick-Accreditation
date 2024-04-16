const express = require("express");
const router = express.Router();
const user = require("../models/user");
const sfrInfo = require("../controllers/sfr");
const { isLoggedIn } = require("../middleware");

router.get("/sfrform", isLoggedIn, sfrInfo.renderform);

router.post("/sfrform", isLoggedIn, sfrInfo.registerFormData);

router.get("/sfrinfo", isLoggedIn, sfrInfo.sfrinfo);

router.get("/sfredit", isLoggedIn, sfrInfo.editinfo);

router.put("/sfredit", isLoggedIn, sfrInfo.updateinfo);

//router.post("/sfredit", sfrInfo.editinfo);

module.exports = router;
