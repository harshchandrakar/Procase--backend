const express = require("express")
const {registerUser}  = require("../controller/authController")

const router = express.Router()

router.route("/user/register").post((req,res)=>{ 
    res.statusCode(200).json({success:true})
})

router.route("/user").get((req,res)=>{
    res.statusCode(200).json({success:"from get"})
})

module.exports = router