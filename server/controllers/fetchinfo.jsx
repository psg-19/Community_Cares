const User=require('../models/User.jsx');
const jwt=require("jsonwebtoken");
const Post=require('../models/POST.jsx');
const DonorPosts=require('../models/DONOR_POSTS.jsx')
const RecieverPosts=require('../models/RECIEVER_POSTS.jsx');
const uploadToCloudinary=require('../config/cloudinary.jsx');
const bcrypt=require('bcrypt')
const OTP=require('../models/OTP.jsx')



exports.getUserPosts=async(req,res)=>{
    try {
     const token=req.body.token||req.cookies.token||req.header('Authorization').replace('Bearer ',"");
 
     if(!token){
         return res.status(400).json({
             success:false,
             message:"Please login to view your posts or create a new post !!!"
         })
     }
 
     const user= jwt.verify(token,process.env.JWT_Secret);
 
     const allPosts=await Post.find({email:user.email});
     // console.log(allPosts)
 
     return res.status(200).json({
         success:true,
         message:"All Posts Fetched Successfully !!!",
         allPosts:allPosts
     })
 
    } catch (error) {
        console.log('getUserPosts fata hai ----> ',error)
            return res.status(400).json({
        
                success:false,
                message:'something went wrong while fetching Posts',
                error:error.message
            })
        }
        
        
    }
    
    exports.getUser=async(req,res)=>{
        try {
            const token=req.body.token||req.cookies.token||req.header('Authorization').replace('Bearer ',"");
 
            if(!token){
                return res.status(400).json({
                    success:false,
                    message:"Please login to view your posts or create a new post !!!"
                })
            }
        
            const userid=jwt.verify(token, process.env.JWT_SECRET);
            const userData = await User.findById(userid._id);

            // console.log(userData)
            userData.password=undefined;

            return res.status(200).json({
                success:true,
                message:"User details fetched successfully !!!",
                userData:userData
            })
            
            
        } catch (error) {
        console.log('getUser fata hai ----> ',error)
            return res.status(400).json({
        
                success:false,
                message:'something went wrong while fetching User details',
                error:error.message
            })
        
    }
 }


 //---------------------------update user-----------------------------------

 exports.updateUser=async(req,res)=>{
    try {
        const token=req.body.token||req.cookies.token||req.header('Authorization').replace('Bearer ',"");
 
            if(!token){
                return res.status(400).json({
                    success:false,
                    message:"Please login to view your posts or create a new post !!!"
                })
            }

            const user=jwt.verify(token,process.env.JWT_SECRET)

            const{firstName,lastName,phoneNo,address,district}=req.body;

            if(req.files){
                const image=req.files.image;

                const  newImage=await uploadToCloudinary.uploadToCloudinary(image,process.env.FOLDER_NAME);

                
                const updatedUser=await User.findByIdAndUpdate(user._id,{
                    firstName:firstName,
                    lastName:lastName,
                    phoneNo:phoneNo,
                    address:address,
                    district:district,
                    profileUrl:newImage.secure_url
                },{new:true})
            }
            else{
                const updatedUser=await User.findByIdAndUpdate(user._id,{
                    firstName:firstName,
                    lastName:lastName,
                    phoneNo:phoneNo,
                    address:address,
                    district:district,
                   
                },{new:true})

            }
            
res.status(200).json({
    success:true,
    message:"User updated successfully !!!"
})

        
    } catch (error) {
        console.log('updateUser fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while updating User details',
            error:error.message
        })
    }
 }



 //-------------------------delete user--------------------------------

 exports.deleteUser=async(req,res)=>{
try {
    const token=req.body.token||req.cookies.token||req.header('Authorization').replace('Bearer ',"");
 
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Please login to delete your account !!!"
        })
    }

    const user=jwt.verify(token,process.env.JWT_SECRET)
    
    const {password}=req.body;

    const userdetails=await User.findById(user._id);

    const checkPassword=await bcrypt.compare(password,userdetails.password);

    // console.log(checkPassword)
    if(!checkPassword){
        return res.status(401).json({
            success:false,
            message:"Password incorrect ,Please try again !!!"
        })
    }

    if(user.role=='Donor'){
        await DonorPosts.findOneAndDelete({
            email:user.email
        })
    }
    else{
        await RecieverPosts.findOneAndDelete({
            email:user.email
        })
        
    }

    await Post.findOneAndDelete({email:user.email})
    await OTP.findOneAndDelete({email:user.email})
    await User.findByIdAndDelete(user._id);

return res.status(200).json({
    success:true,
    message:"User and related Posts and its otps deleted successfully !!!"
})

    
} catch (error) {
    console.log('deleteUser fata hai ----> ',error)
    return res.status(400).json({

        success:false,
        message:'something went wrong while deleting User',
        error:error.message
    })
}
 }

 exports.getAllDonorPosts=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log('getAllDonorPosts fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while fetching donor posts !!!',
            error:error.message
        })
    }
 }