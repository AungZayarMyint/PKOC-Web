const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const controller = require("../controllers/userController");

router.get("/user/profile", auth, controller.getProfile);
// for admin
router.get("/admin/users", controller.all);
router.post("/admin/users/:id", controller.update);

module.exports = router;
