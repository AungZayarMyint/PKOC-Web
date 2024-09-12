const User = require("../models/User");

exports.getDashboardData = async (req, res) => {
  try {
    const totalUser = await User.countDocuments();

    const data = {
      total_user: totalUser,
    };
    res
      .status(200)
      .json({ isSuccess: true, data: data, message: "Dashboard Data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
