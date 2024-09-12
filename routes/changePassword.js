const express = require("express");
const auth = require("../middlewares/auth");
const controller = require("../controllers/auth");
const router = express.Router();

router.post("/change-password", auth, controller.changePassword);

module.exports = router;
