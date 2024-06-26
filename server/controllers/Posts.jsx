const User=require('../models/User.jsx');
const jwt=require("jsonwebtoken");
const Post=require('../models/POST.jsx');
const DonorPosts=require('../models/DONOR_POSTS.jsx')
const RecieverPosts=require('../models/RECIEVER_POSTS.jsx');
const uploadToCloudinary=require('../config/cloudinary.jsx');





//----------------------------create post----------------------------
exports.createPost=async(req,res)=>{
   try {
    const token=req.cookies.token||req.body.token;

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

const {title,description,district,address,quantity}=req.body;
// console.log(req.body)
// console.log(title,description,district,address)
// console.log('lllllll',req.files.image)
if(!req.files){
    return res.status(401).json({
        success:false,
        message:'All fields are mandatory'
    })
}
const image=req.files.image;


const supportedTypes=['jpg','jpeg','png']

        
const fileType=image.name.split('.').slice(-1);
// console.log(fileType[0],'--------')
// console.log('fileType  ----->',fileType)
// const checkFormat=require('./fileUpload.jsx');
const fileType1=fileType[0];

//function
function checkFormat(supportedTypes,fileType1){
    if(supportedTypes.includes(fileType1)){
     return true;
    }
    else return false;
 }

if(!( checkFormat(supportedTypes,fileType1) )){
return res.status(400).json({
    success:false,
    message:'File format not supported'
})
}


if(!req.files){
    return res.status(401).json({
        success:false,
        message:'All fields are mandatory'
    })
}

if(!title||!description||!image||!district||!address||district.trim()==''||address.trim()==''||title.trim()==''||description.trim()==''||!quantity||quantity.trim()==''){
    // console.log('hiiii')
    return res.status(401).json({
        success:false,
        message:'All fields are mandatory'
    })
}

// if(!title||!address ||!quantity||!postId||title.trim()=='' ||description.trim()=='' ||district.trim()=='' ||address.trim()==''  ||quantity.trim()=='' ||postId.trim()==''){
//     return res.status(401).json({
//         success:false,
//         message:'All Fields Are Mandatory !!!'
//     })
// }



const  newImage=await uploadToCloudinary.uploadToCloudinary(image,process.env.FOLDER_NAME);

const newPost=await Post.create({
    email:email,
    title,
    description,
    imageUrl:newImage.secure_url,
    district,
    address,
    quantity,
    userName:tokenObj.name,

});




if(role=='Donor'){
  await DonorPosts.create({posts:newPost._id,email:email});
    
}


else{
   await RecieverPosts.create({posts:newPost._id,email:email});

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

     const token=req.body.token||req.cookies.token;

     if(!token){
        return res.status(400).json({
            success:false,
            message:'Please login to like a post'
        })
     }

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

exports.updatePost=async(req,res)=>{
    try {
        
        const{title,description,district,address ,quantity,postId}=req.body;

        if(!title||!address ||!quantity||!postId||title.trim()=='' ||description.trim()=='' ||district.trim()=='' ||address.trim()==''  ||quantity.trim()=='' ||postId.trim()==''){
            return res.status(401).json({
                success:false,
                message:'All Fields Are Mandatory !!!'
            })
        }

       if(req.files){

           // console.log(await Post.findById(postId));
           if(req.files)   {
        const image=req.files.image;


        
const supportedTypes=['jpg','jpeg','png']

             
const fileType=image.name.split('.').slice(-1);
// console.log(fileType[0],'--------')
// console.log('fileType  ----->',fileType)
// const checkFormat=require('./fileUpload.jsx');
const fileType1=fileType[0];

//function
function checkFormat(supportedTypes,fileType1){
    if(supportedTypes.includes(fileType1)){
     return true;
    }
    else return false;
 }

if(!( checkFormat(supportedTypes,fileType1) )){
return res.status(400).json({
    success:false,
    message:'File format not supported'
})
}






         const  newImage=await uploadToCloudinary.uploadToCloudinary(image,process.env.FOLDER_NAME);
         const updatedPost=await Post.findByIdAndUpdate(postId,{
             title:title,
             description:description,
             district:district,
             quantity:quantity,
             imageUrl:newImage.secure_url,
             address:address
             
         },{new:true});


         return res.status(200).json({
            success:true,
            message:"Post updated successfully !!!",
            updatedPost:updatedPost
        })

}
       }
else {

const updatedPost=await Post.findByIdAndUpdate(postId,{
    title:title,
    description:description,
    district:district,
    quantity:quantity,
    address:address
    
},{new:true})
return res.status(200).json({
    success:true,
    message:"Post updated successfully !!!",
    updatedPost:updatedPost
})
}




    } catch (error) {
        console.log('updatePost fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while updating Post',
            error:error.message
        })
    }
}

exports.deletePost=async(req,res)=>{
    try {

        const {postId}=req.body;
        const token=req.body.token||req.cookies.token;
console.log(postId)
        if(!token||token==''){
            return res.status(401).json({
                success:false,
                 message:'token is missing ,Please Login !!!'
            })
        }
    
        const user=jwt.verify(token,process.env.JWT_SECRET);

        const deleteFromUser=await User.findByIdAndUpdate(user._id,{
            $pull:{
                posts:postId
            }
        },{new:true})

        if(deleteFromUser) console.log('user m se delete');

        if(user.role=="Donor"){
            const deleteFromDonorPosts=await DonorPosts.findOneAndDelete({email:user.email});
            if(deleteFromDonorPosts) console.log('donorposts m se deleted');
        }
        else{
            const deleteFromrecieverPosts=await RecieverPosts.findOneAndDelete({email:user.email});
            if(deleteFromrecieverPosts) console.log('recieversposts m se deleted');

        }

        const deleteFromPosts=await Post.findByIdAndDelete(postId);
if(deleteFromPosts) console.log("post deleted from post schema")

        return res.status(200).json({
            success:true,
            message:"Posts deleted successfully !!!"
        })
        
    } catch (error) {
        console.log('deletePost fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while deleting Post',
            error:error.message
        })
    }
}

