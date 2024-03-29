const DonorPosts=require('../models/DONOR_POSTS.jsx');
const RecieverPosts=require('../models/RECIEVER_POSTS.jsx');
const ConnectedPosts=require('../models/ConnectedPosts.jsx');

exports.BootUp=async(req,res)=>{
    try {
        const donors=await DonorPosts.find({}).populate('posts').exec();

        
    for(let i=0;i<donors.length;i++){
      if(donors[i].posts.expiresAt.getTime()<new Date(Date.now()).getTime()||donors[i].posts.status==true){
        await DonorPosts.findByIdAndDelete(donors[i]._id)
      }
    }


        const recievers=await RecieverPosts.find({}).populate('posts').exec();


    for(let i=0;i<recievers.length;i++){
      if(recievers[i].posts.expiresAt.getTime()<new Date(Date.now()).getTime()||recievers[i].posts.status==true){
        await RecieverPosts.findByIdAndDelete(recievers[i]._id)
      }
    }


    const connectedPosts=await ConnectedPosts.find({});

    for(let i=0;i<connectedPosts.length;i++){
      if(connectedPosts[i].expiresAt.getTime()<new Date(Date.now()).getTime()){
        await ConnectedPosts.findByIdAndDelete(connectedPosts[i]._id);
      }
    }


   
        return res.status(200).json({
            success:true,
            message:"Expired or completed posts Donor Posts, reciever's posts and connected posts deleted successfully !!!"
        });


    } catch (error) {
        console.log('bootup controller fata hai ---->  ',error)
        return res.status(402).json({
            success:false,
            message:"something went wrong while reloading posts"
        });
        
    }
}