const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true ,"Please enter your name"],
        minlength:[4,"Name length must be atleast 4"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:[true,"User already exist"],
        validate:[validator.isEmail ,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter Password"],
        minlength:[8,"password must have atleast 8 characters"]
    },
    avatar:{
        data:Buffer,
        contentType:String
    },
    role:{
        type:String,
        default:"user",
    },
})

const pinSchema = new mongoose.Schema({
    userId:String,
    pin:String,
    email:String
})

exports.User = mongoose.model("User",userSchema)
exports.pinSchema = mongoose.model("Pin",pinSchema)