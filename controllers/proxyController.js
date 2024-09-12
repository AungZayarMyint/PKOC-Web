const path = require("path");

exports.getProxy = async (req, res) => {
  try {
    const { image_name } = req.params;
    const image_path = path.join(__dirname, "../uploads/", image_name);
    res.sendFile(image_path);
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: error?.message });
  }
};
