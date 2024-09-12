const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const app = express();
const server = require("http").Server(app);

app.use(express.json());
app.use(cors());
app.use(fileUpload());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

const changePasswordRoute = require("./routes/changePassword");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const userRoute = require("./routes/userRoute");

const AdminDashboard = require("./routes/adminDashboard");
const proxy = require("./routes/proxy");
const { isAdmin } = require("./middlewares/admin");
const auth = require("./middlewares/auth");

// for users
app.use("/api", changePasswordRoute);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", proxy);

// for admin
app.use("/api", userRoute);
app.use("/api", AdminDashboard);

const PORT = process.env.PORT || 5555;
server.listen(PORT, () => {
  console.log(`Server is running at port - ${PORT}`);
});
