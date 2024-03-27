const ConnectedPosts=require('../models/ConnectedPosts.jsx')
const DonorPosts=require('../models/DONOR_POSTS.jsx');
const RecieverPosts=require('../models/RECIEVER_POSTS.jsx');
const Post=require("../models/POST.jsx");
const User=require('../models/User.jsx');
const jwt=require('jsonwebtoken')

exports.connectedPosts=async(req,res)=>{
try {
    
    const {reciverPostId}=req.body;
    const token=req.cookies.token||req.body.token||req.header('Authorization').replace('Bearer ',"");

    if(!token){
        return res.status(402).json({
            success:false,
            message:"Please login to Donate !!!"
        })
    }
    
    const donor=jwt.verify(token,process.env.JWT_SECRET);
    // console.log(donor);

    const donorEmail=donor.email;
    // const checkAlreadyDonated=await ConnectedPosts.findOne({donorEmail:donorEmail})
    
    // // console.log(checkAlreadyDonated)
    // if(checkAlreadyDonated){
    //     return res.status(403).json({
    //         success:false,
    //         message:'You already donated !!!'
    //     })
    // }

    const donorPost=await DonorPosts.findOne({email:donorEmail}).populate('posts').exec();

    if(!donorPost){
        return res.status(403).json({
            success:false,
            message:"Create a donor post first"
        })
    }
   

    const donorUpdatedPostId=donorPost.posts._id;
    
    const updateDonor=await Post.findOneAndUpdate({_id:donorUpdatedPostId},{
       
            status:true
        
    },{new:true})
    
    
    //    const postIdDonor=donorPost.id;
    
    if(!donorPost){
        return res.status(400).json({
            success:false,
            message:'Create a Donation post first !!!'
        })
    }
    
    const recieversPost=await RecieverPosts.findById(reciverPostId).populate('posts').exec();
    
    
    const recieverUpdatedPostId=recieversPost.posts._id;
    // const postIdReciever=recieversPost.id;
    
    
    const recieverEmail=recieversPost.email;
    
    
    
    const updateReciever=await Post.findOneAndUpdate(recieverUpdatedPostId,{
        
            status:true
        
    },{new:true})
    // console.log(await Post.findOne(recieverUpdatedPostId));
    //------------------------------------------

   const connectedPostInfo= await ConnectedPosts.create({
    donorEmail:donorEmail,
    recieverEmail:recieverEmail,
    recieverPost:recieverUpdatedPostId,
    donorPost:donorUpdatedPostId
   })

   const donorUser=await User.findOne(donorEmail);
   const recieverUser=await  User.findOne(recieverEmail)

   try {

    const  mailResponse=await mailSender(recieverEmail,`Congratulations !!! </br> Donor Found @Community Cares`,`
    Dear ${recieverUser.firstName},<br/>
    You have your Donor for todays requirement.
    Here are their contact details 
    Name: ${donorUser.firstName} ${donorUser.lastName} <br/>
    Email :${donorUser.email} <br/>
    Phone Number : ${donorUser.phoneNo}
</br>
Enjoy your meal !!!
    `);
    console.log('email sent successfully',mailResponse);

    
} catch (error) {
    console.log('error occured while sending confirmation mail : ',error);
    throw error;
}

    return res.status(200).json({
        success:true,
        message:'Connection SuccessFull !!!'
    })


} catch (error) {
    console.log('connected posts controller fata hai ----> ',error)
    return res.status(400).json({

        success:false,
        message:'something went wrong while connecting Post',
        error:error.message
    })
}

}




