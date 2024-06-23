const express = require("express");
const adminAuthMiddleware = require("../Middlewares/admin")
const router = express.Router();
const { Admin , Course } = require("../db/index")

router.post("/signup",(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username:username,
        password:password
    })
    .then(function(){
        res.status(200).json({
            msg:"Admin Created Succesfully"
        })
    })
    .catch(function(){
        res.json({
            msg:"Error"
        })
    })
    
})

router.post("/courses",adminAuthMiddleware,async (req,res)=>{
    const username = req.headers.username;
    const password = req.headers.password;
    const courseTitle = req.body.title;
    const courseDescription = req.body.description;
    const coursePrice = req.body.price;
    const courseIMGtoLink = req.body.imageLink;

    const NewCourse = await Course.create({
        title: courseTitle,
        description: courseDescription,
        imageLink : courseIMGtoLink,
        price: coursePrice
    })
    res.status(200).json({
        msg : "Course Created Successfully", CourseID : NewCourse._id
    })


})

router.get("/courses",adminAuthMiddleware,async (req,res)=>{
    const response = await Course.find({})
    res.json({
        Courses : response 
    })
})

module.exports = router;