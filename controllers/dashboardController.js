const Post = require("../models/Post");
const User = require("../models/User");

exports.getDashboardData = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();
    const totalPost = await Post.countDocuments();

    const data = {
      total_user: totalUser,
      total_post: totalPost,
    };
    res
      .status(200)
      .json({ isSuccess: true, data: data, message: "Dashboard Data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
