const { body } = require("express-validator");
const { Router } = require("express");

const router = Router();

const authController = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({ success: 1, message: "Welcome to Stock 2D API" });
});

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name must have!")
      .isLength({ min: 3 })
      .withMessage("Name must have at least three characters!"),
    body("password").trim().notEmpty().withMessage("Password must have!"),
    body("confirm_password")
      .trim()
      .notEmpty()
      .withMessage("Password must be the same")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match!");
        }
        return true;
      }),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is not valid")
      .normalizeEmail(),
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is not valid")
      .normalizeEmail(),
    body("password").trim().notEmpty().withMessage("Password must have!"),
  ],
  authController.login
);
// for admin
router.post(
  "/admin/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is not valid")
      .normalizeEmail(),
    body("password").trim().notEmpty().withMessage("Password must have!"),
  ],
  authController.adminLogin
);

router.post("/logout", authController.logout);

module.exports = router;
