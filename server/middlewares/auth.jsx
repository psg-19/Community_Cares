
const jwt=require('jsonwebtoken');

exports.isDonor=async(req,res,next)=>{
    try {
        const token=req.cookies.token||req.body.token||req.header('Authorization').replace('Bearer ',"");

    const user= jwt.verify(token,process.env.JWT_SECRET);
    // console.log(user);
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