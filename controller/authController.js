const User = require("../models/userModel")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middleware/catchAsyncError")

exports.registerUser = catchAsyncError(async (req,res)=>{
    const {
        name,
        email,
        password,
        avatar,
        role
    } =req.body;
    console.log("sdasfdasdfad")
    password = await bycrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password,
        avatar,
        role
    });
    res.status(201).send("User Created successfully")
})