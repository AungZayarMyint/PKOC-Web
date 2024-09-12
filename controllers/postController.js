const Post = require("../models/Post");
const { validationResult } = require("express-validator");
const fileDelete = require("../utils/file");
const upload = require("../middlewares/multer");

exports.createPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "File upload failed!" });
    }

    const { title, description } = req.body;

    try {
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({
          isSuccess: false,
          message: "Please select one photo at least!",
        });
      }

      const imgUrls = files.map((file) => file.path);

      const post = new Post({
        title,
        description,
        imgUrls,
        userId: req.user._id,
      });

      await post.save();

      return res.status(201).json({
        isSuccess: true,
        message: "Post created successfully!",
        data: post,
      });
    } catch (error) {
      console.log("Failed to create post : ", error);
      return res.status(500).json({ isSuccess: false, message: error.message });
    }
  });
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.sort({ createdAt: -1 });

    res.status(200).json({
      isSuccess: true,
      data: posts.docs,
    });
  } catch (error) {
    console.log("Error fetching all posts : ", error);
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("userId email");

    if (!post) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Post not found!" });
    }

    res.status(200).json({ isSuccess: true, data: post });
  } catch (error) {
    console.log("Error fetching post", error);
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, description } = req.body;
    const files = req.files;

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Post not found!" });
    }

    post.title = title || post.title;
    post.description = description || post.description;

    if (files & (files.length > 0)) {
      post.imgUrls.forEach((filePath) => fileDelete(filePath));
      post.imgUrls = files.map((file) => file.path);
    }

    await Post.save();

    return res
      .status(200)
      .json({
        isSuccess: true,
        message: "Post updated successfully!",
        data: post,
      });
  } catch (error) {
    console.log("Error updating post : ", error);
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Post not found!" });
    }

    post.imgUrls.forEach((filePath) => fileDelete(filePath));

    await Post.findByIdAndDelete(postId);

    return res
      .status(200)
      .json({ isSuccess: true, messsage: "Post deleted successfully!" });
  } catch (error) {
    console.log("Error deleting post", error);
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
