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
    
    const updateDonor=await Post.findOneAndUpdate({_id:donorUpdatedPostId},{
       
            status:true
        
    },{new:true})
    
    
    //    const postIdDonor=donorPost.id;
    
    // if(!donorPost){
    //     return res.status(400).json({
    //         success:false,
    //         message:'Create a Donation post first !!!'
    //     })
    // }
    
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
    Name: ${recieverEmail.firstName} ${recieverEmail.lastName} <br/>
    Email :${recieverEmail.email} <br/>
    Phone Number : ${recieverEmail.phoneNo}
</br>
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

        const postDetails=(await ConnectedPosts.findOne({donorEmail:user.email}).populate('donorPost').populate('recieverPost').exec()||await ConnectedPosts.findOne({recieverEmail:user.email}).populate('donorPost').populate('recieverPost').exec());
        

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



