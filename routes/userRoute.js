const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const { isAdmin } = require("../middlewares/admin");
const auth = require("../middlewares/auth");

router.get("/users", auth, isAdmin, controller.all);

module.exports = router;
