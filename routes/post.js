const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const controller = require("../controllers/postController");
const { isAdmin } = require("../middlewares/admin");

router.get("/posts", auth, controller.getAllPosts);
router.get("/post/:postId", auth, controller.getPost);

// for admin
router.post("/admin/create-post", auth, isAdmin, controller.createPost);
router.post("/admin/update-post/:postId", auth, isAdmin, controller.updatePost);
router.post("/admin/delete-post/:postId", auth, isAdmin, controller.deletePost);

module.exports = router;
