const express = require("express");
const router = express.Router();
const user = require("../models/user");
const fqInfo = require("../controllers/fq");
const { isLoggedIn } = require("../middleware");

router.get("/fqform", isLoggedIn, fqInfo.renderform);

router.post("/fqform", isLoggedIn, fqInfo.registerFormData);

router.get("/fqinfo", isLoggedIn, fqInfo.fqinfo);

router.get("/fqedit", isLoggedIn, fqInfo.editinfo);

router.put("/fqedit", isLoggedIn, fqInfo.updateinfo);

//router.post("/sfredit", sfrInfo.editinfo);

module.exports = router;
