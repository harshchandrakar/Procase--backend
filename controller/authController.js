const {User,pinSchema} = require("../models/userModel")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middleware/catchAsyncError")
const {sendEmail} = require("../utils/notification")
const pinGen = require("secure-pin")

// for user registeration
exports.registerUser = catchAsyncError(async (req,res)=>{
    let {
        name,
        email,
        password,
        avatar,
        role
    } =req.body;
    password = await bycrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password,
        avatar,
        role
    });
        res.status(201).json({message:"User Created successfully",success:true})
})

// For user login

exports.userLogin = catchAsyncError(async (req,res) =>{
    let {email , password} = req.body
    if (!email || !password ){
        res.status(400).json({success:false,meassage:"please fill input field"})
        return
    }
    let user = await User.findOne({email:email})
    if (!user){
        res.status(404).json({success:false,message:"User doesn't exists please register"})
        return
    }
    let equal = await bycrypt.compare(password,user.password)

    if (!equal) {
        res.status(401).json({success:false , message:"Unauthorized access"})
        return
    }
    const accessToken = jwt.sign(user.toJSON(),process.env.JWT_SECRET)
    res.status(201).json({accessToken:accessToken , success:true , message:"Authorization successful"})

})

exports.forgotPassWord = catchAsyncError( async (req,res)=>{
    let {email} =req.body
    if (!email) {
        res.status(400).json({success:false , message:"Please enter email"})
        return
    }

    let user = await User.findOne({email:email})
    if (!user) {
        res.status(401).json({success:false , message:"User Doesn't exist"})
        return
    }
    let pin  = pinGen.generatePinSync(6)
    sendEmail(email,"Pin for changing password" , `Your pin for changing password is ${pin}`)

    let Dpin = await pinSchema.findOne({email:email})

    if (!Dpin){
        await pinSchema.create({
            usedId:user._id,
            email:email,
            pin:pin
        })
    }else{
        console.log("from Update")
        await pinSchema.findOneAndUpdate({email:email},{ $set:{ pin:pin}})
    }

    

 

    res.status(200).json({success:true , message:"Posted email successfully"})

})

exports.verifyOtp = catchAsyncError(async (req,res)=>{
    let {email,inpin} = req.body
    // let user = await User.findOne({email:email})
    let Dpin = await pinSchema.findOne({email:email})
    console.log(Dpin)
    if (Dpin.pin != inpin){
        res.status(401).json({success:false , message:"Unauthorized Pin"})
        return
    }

    res.status(200).json({success:true , message:"Authorized Pin"})

})
 
exports.updatePassword = catchAsyncError(async (req,res)=>{
    let {email,password}=req.body
    if (!email){
        res.status(401).json({success:false , message:"please fill email field"})
        return
    }
    password = await bycrypt.hash(password,10)
    console.log(password)
    await User.findOneAndUpdate({email:email},{$set:{password:password}})

    res.status(200).json({success:true , message:"Password changed successfully"})
})