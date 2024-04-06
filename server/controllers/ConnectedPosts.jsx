const ConnectedPosts=require('../models/ConnectedPosts.jsx')
const DonorPosts=require('../models/DONOR_POSTS.jsx');
const RecieverPosts=require('../models/RECIEVER_POSTS.jsx');
const Post=require("../models/POST.jsx");
const User=require('../models/User.jsx');
const jwt=require('jsonwebtoken');
const mailSender=require('../utils/mailSender.jsx');

exports.connectedPosts=async(req,res)=>{
try {
    
    const {reciverPostId}=req.body;
    const token=req.cookies.token||req.body.token||(req.header('Authorization').replace('Bearer ',""));
    if(!token){
        return res.status(402).json({
            success:false,
            message:"Please login to Donate !!!"
        })
    }
    
    const donor=jwt.verify(token,process.env.JWT_SECRET);
    
    // if(donor.role=='Reciever'){
        //     return res.status(401).json({
            //         success:false,
            //         message:"Only donor can access this route"
            //     })
            // }
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


                    const recieversPost=await RecieverPosts.findById(reciverPostId).populate('posts').exec();
                    // console.log(recieversPost)

                    if(recieversPost.posts.quantity>donorPost.posts.quantity){
                        return res.status(402).json({
                            success:false,
                            message:`Cannot Donate, Reciever needs food for ${recieversPost.posts.quantity} people`
                        })
                    }


const recieverUpdatedPostId=recieversPost.posts._id;
                    


                    const updateDonor=await Post.findOneAndUpdate({_id:donorUpdatedPostId},{
                        
                        status:true,
                        connectedTo:recieverUpdatedPostId
                        
                    },{new:true})
                    
                    
                    //    const postIdDonor=donorPost.id;
                    
                    // if(!donorPost){
                        //     return res.status(400).json({
                            //         success:false,
                            //         message:'Create a Donation post first !!!'
                            //     })
                            // }
                            
    // const postIdReciever=recieversPost.id;
    
    
    const recieverEmail=recieversPost.email;
    
    
    
    const updateReciever=await Post.findOneAndUpdate(recieverUpdatedPostId,{
        
            status:true,
            connectedTo:donorUpdatedPostId
        
    },{new:true})

    await RecieverPosts.findByIdAndDelete(reciverPostId);
    await DonorPosts.findByIdAndDelete(donorPost._id)
    // console.log(await Post.findOne(recieverUpdatedPostId));
    //------------------------------------------

   const connectedPostInfo= await ConnectedPosts.create({
    donorEmail:donorEmail,
    recieverEmail:recieverEmail,
    recieverPost:recieverUpdatedPostId,
    donorPost:donorUpdatedPostId
   })

//    await Post.findByIdAndUpdate(recieverUpdatedPostId)

   const donorUser=await User.findOne({email:donorEmail});
   const recieverUser=await  User.findOne({email:recieverEmail})

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
    console.log('error occured while sending confirmation mail to reciever: ',error);
    throw error;
}
   try {

    const  mailResponse=await mailSender(donorEmail,`Congratulations !!! </br> Reciever Found @Community Cares`,`
    Dear ${donorUser.firstName},<br/>
    You have your Reciever for todays Food.
    Here are their contact details 
    Name: ${recieverUser.firstName} ${recieverUser.lastName} <br/>
    Email :${recieverUser.email} <br/>
    Phone Number : ${recieverUser.phoneNo}
<br/>
Please coordinate accordingly for proper disbursal of food
</br>
Enjoy your Day !!!
    `);
    console.log('email sent successfully',mailResponse);

    
} catch (error) {
    console.log('error occured while sending confirmation mail to donor: ',error);
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


//---------------------get connected posts of user----------------

exports.getConnectedPostsUser=async(req,res)=>{
    try {
        
        const token=req.cookies.token||req.body.token||(req.header('Authorization').replace('Bearer ',""));

        if(!token){
            return res.status(402).json({
                success:false,
                message:"Please login to Donate !!!"
            })
        }
        
        const user=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(user)

        let postDetails=await ConnectedPosts.find({donorEmail:user.email}).populate('donorPost').populate('recieverPost').exec();

        if(postDetails.length==0){
            postDetails=await ConnectedPosts.find({recieverEmail:user.email}).populate('donorPost').populate('recieverPost').exec()
        }

        // console.log(postDetails)
        

        return res.status(200).json({

            success:true,
            message:'connected posts fetched successfully !!!',
            postDetails:postDetails
        })

        
        

    } catch (error) {
        console.log('getConnectedPostsUser controller fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while fteching connected Post',
            error:error.message
        }) 
    }
}

//-----------------------get all connected posts----------------

exports.getAllConnectedPosts=async(req,res)=>{
    try {

        const connectedPosts=await ConnectedPosts.find({}).populate('donorPost').populate('recieverPost').exec();;

        return res.status(200).json({
            success:true,
            message:"All connected Posts fetched successfully !!!",
            connectedPosts:connectedPosts
        })
        
    } catch (error) {
        console.log('getAllConnectedPosts controller fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while fteching all connected Post',
            error:error.message
        }) 
    }
}

exports.likeConnectedPost=async(req,res)=>{
    try {
        const {postId}=   req.body;
// console.log(req.body)
// console.log(postId)
        const token=req.body.token||req.cookies.token;
//    console.log(token)
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
       const unlikePost=await ConnectedPosts.findById(postId);
   
       if(unlikePost.likes.includes(user._id)){
           const likedPost=await ConnectedPosts.findByIdAndUpdate(postId,{
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
       const likedPost=await ConnectedPosts.findByIdAndUpdate(postId,{
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
           console.log('likeConnectedpost controller fata hai ----> ',error)
           return res.status(400).json({
       
               success:false,
               message:'something went wrong while liking the Post',
               error:error.message
           })
       }
}


