const express = require("express");
const {
  registerUser,
  userLogin,
  forgotPassWord,
  verifyOtp,
  updatePassword,
} = require("../controller/authController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const router = express.Router();

router.route("/user/register").post(upload.single("avatar"), registerUser);

router.route("/user/login").post(userLogin);

router.route("/user/forgot").post(forgotPassWord);

router.route("/user/otp/verify").post(verifyOtp);

router.route("/user/updatePassword").patch(updatePassword);

module.exports = router;
