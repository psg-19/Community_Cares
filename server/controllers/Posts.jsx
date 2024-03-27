const User=require('../models/User.jsx');
const jwt=require("jsonwebtoken");
const Post=require('../models/POST.jsx');
const DonorPosts=require('../models/DONOR_POSTS.jsx')
const RecieverPosts=require('../models/RECIEVER_POSTS.jsx');
const uploadToCloudinary=require('../config/cloudinary.jsx');




//----------------------------create post----------------------------
exports.createPost=async(req,res)=>{
   try {
    const token=req.cookies.token||req.body.token||req.header('Authorisation').replace('Bearer ',"");

    if(!token){
        return res.status(401).json({
            success:false,
             message:'token is missing ,Please Login !!!'
        })
    }

    const tokenObj=jwt.verify(token,process.env.JWT_SECRET);
    // console.log(tokenObj)

const email=tokenObj.email;
const id=tokenObj.id;
const role=tokenObj.role;

if(await DonorPosts.findOne({email:`${email}`})||await RecieverPosts.findOne({email:`${email}`})){
    return  res.status(401).json({
        success:false,
        message:"You can only create one post per day"
    })
}

const {title,description}=req.body;
const image=req.files.image;

if(!title||!description||!image||title.trim()==''||description.trim()==''){
    return res.status(400).json({
        success:false,
        message:'All fields are mandatory'
    })
}

const  newImage=await uploadToCloudinary.uploadToCloudinary(image,process.env.FOLDER_NAME);

const newPost=await Post.create({
    email:email,
    title,
    description,
    imageUrl:newImage.secure_url,

});


const updateUser=await User.findByIdAndUpdate(id,{
$push:{
posts:newPost._id
}
},
{new:true}).populate('posts').exec();

if(role=='Donor'){
    const updateRolePosts= await DonorPosts.create({posts:newPost._id,email:email});
    
}
else{
    const updateRolePosts= await RecieverPosts.create({posts:newPost._id,email:email});

}
// console.log(updateRolePosts)

    return res.status(200).json({
        success:true,
        message:'Post created successfully !!!'
    })

   } catch (error) {
    console.log('createPost fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while creating Post',
            error:error.message
        })
   }
}

//------------------------------------Like post--------------------------------------

exports.likePost=async(req,res)=>{
    try {

     const {postId}=   req.body;
     const token=req.body.token||req.cookies.token||req.header('Authorization').replace('Bearer ',"");

     if(!postId){
        return res.status(200).json({
            success:false,
            message:"Post is not available !!!"
        })
     }


     const user=jwt.verify(token,process.env.JWT_SECRET);
    //  console.log(user)
    const unlikePost=await Post.findById(postId);

    if(unlikePost.likes.includes(user._id)){
        const likedPost=await Post.findByIdAndUpdate(postId,{
            $pull:{
                likes:user._id
            }
            
         },{new:true})
    
         return res.status(200).json({
            success:true,
            message:'Post Unliked !!!'
         })
    }

   else{
    const likedPost=await Post.findByIdAndUpdate(postId,{
        $push:{
            likes:user._id
        }
        
     },{new:true})

     return res.status(200).json({
        success:true,
        message:'Post Liked !!!'
     })
   }
        
    } catch (error) {
        console.log('likepost controller fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while liking the Post',
            error:error.message
        })
    }
}