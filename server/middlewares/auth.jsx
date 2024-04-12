
const jwt=require('jsonwebtoken');

exports.isDonor=async(req,res,next)=>{
    try {
        const token=req.cookies.token||req.body.token||req.header('Authorization').replace('Bearer ',"");
let user;
 jwt.verify(token,process.env.JWT_SECRET,function(err, token) {
        // console.log(token);
        if(token){
            user=token
        }
       

      });
    
    if(!user){
        return res.status(403).json({
            success:false,
           
           
           
            message:'Please login again ,Token Expired'
        })
    }

   
 
      
if(user.role!='Donor'){
    return res.status(400).json({
        success:false,
        message:"Protected page for donors only"
    })
}
next();

    } catch (error) {
        console.log('isdonor middleware fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while verifying user',
            error:error.message
        })
    }
}

exports.isReciever=async(req,res)=>{
    try {
        const token=req.cookies.token||req.body.token||req.header('Authorization').replace('Bearer ',"");

    const user= jwt.verify(token,process.env.JWT_SECRET);
    // console.log(user);
if(user.role!='Reciever'){
    return res.status(400).json({
        success:false,
        message:"Protected page for Reciever only"
    })
}
next();

    } catch (error) {
        console.log('isReciever middleware fata hai ----> ',error)
        return res.status(400).json({
    
            success:false,
            message:'something went wrong while verifying user',
            error:error.message
        })
    }
}




exports.logout=async(req,res)=>{
    try {

        const option={
            // expire:Date.now()+24*60*60*1000,
            
            //   secure: process.env.NODE_ENV === "production" ,
            //   httpOnly: true, 
            secure: true, // required for cookies to work on HTTPS
          httpOnly: false,
          sameSite: 'none'
        }
        return res.cookie('token','expired',option).status(200).json({
            success:true,
            message:"cookie deleted"
        })
        
    } catch (error) {
        console.log('logout afta hai-------->',error);
        return res.status(400).json({
            success:false,
            message:'something went wrong while deleteing cookie',
            error:error
        })
    }
}