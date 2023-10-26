const express = require("express");
const router = express.Router();
const translationCtrl = require("../../controllers/api/translations");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/:id", ensureLoggedIn, translationCtrl.getDay);
router.post("/", translationCtrl.create); // TODO: need to read-add ensureLoggedIn once I figure out how whether to stick with user or go with profile (and then how to change it in the in ensureLoggedIn function)
router.put("/:id", ensureLoggedIn, translationCtrl.update);

module.exports = router;
