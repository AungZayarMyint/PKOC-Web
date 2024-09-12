const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.getProfile = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching.", error);
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};

exports.all = async (req, res) => {
  try {
    const { role, page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const query = { role: "user" };

    const all_roles = ["admin", "user"];

    if (all_roles.includes(role)) {
      query.role = role;
    }

    const result = await User.paginate(query, options);

    res.status(200).json({
      isSuccess: true,
      data: result.docs,
      meta: {
        current_page: result.page,
        last_page: result.totalPages,
        total: result.totalDocs,
      },
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error?.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "User not found!" });
    }

    return res.status(200).json({
      isSuccess: true,
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};
