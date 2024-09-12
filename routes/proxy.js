const express = require("express");
const router = express.Router();
const controller = require("../controllers/proxyController");

router.get("/proxy/image/:image_name", controller.getProxy);

module.exports = router;
