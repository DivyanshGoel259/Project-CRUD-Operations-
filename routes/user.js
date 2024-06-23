const express = require("express");
const { User, Course } = require("../db/index")
const userAuthMiddleware = require("../Middlewares/admin")
const router = express.Router();
const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

router.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username:username,
        password:password
    })
    .then(function(){
        res.status(200).json({
            msg:"User Created Succesfully"
        })
    })
    .catch(function(){
        res.status(500).json({
            msg:"Error"
        })
    })

})

router.get("/courses",async (req,res)=>{
    const response = await Course.find({})
    res.json({
        Courses : response
    })
})

router.post("/courses/:courseID",userAuthMiddleware,(req,res)=>{
    const courseID = req.params.courseID;
    const username = req.username;
    User.updateOne({username:username},{"$push":{
        purchasedCourses : courseID
    }})
    .then(()=>{
        res.json({
            msg:"Purchased Successfully"
        })
    })
})

router.get("/purchasedCourses",userAuthMiddleware,async (req,res)=>{
    const user = await User.findOne({
        username:req.username
    })
    const courses = await Course.find({
        _id:{
            "$in" : user.purchasedCourses
        }
    })
    res.json({
        Courses:courses
    })
})

router.post("/signin",(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;
    
    const user = User.findOne({
        username,
        password
    })

    if(user){
        const token = jwt.sign({username:username},jwtSecret)
        res.status(200).json({
            token,
        })
    } else {
        res.send("User Doesn't Exist")
    }
})

module.exports = router;