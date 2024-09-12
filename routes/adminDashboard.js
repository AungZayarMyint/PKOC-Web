const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { getDashboardData } = require("../controllers/dashboardController");

router.get("/admin/dashboard", auth, isAdmin, getDashboardData);

module.exports = router;
