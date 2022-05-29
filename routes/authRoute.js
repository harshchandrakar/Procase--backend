const express = require("express")
const {registerUser,userLogin,forgotPassWord,verifyOtp,updatePassword}  = require("../controller/authController")

const router = express.Router()

router.route("/user/register").post(registerUser)

router.route("/user/login").post(userLogin)

router.route("/user/forgot").post(forgotPassWord)

router.route("/user/otp/verify").post(verifyOtp)

router.route("/user/updatePassword").patch(updatePassword)

module.exports = router