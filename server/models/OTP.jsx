const mongoose=require('mongoose')
const mailSender=require('../utils/mailSender.jsx')
const otpSchema=new mongoose.Schema({
    otp:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },
    email:{
        type:String,
        requires:true
    }



})

otpSchema.pre('save',async function(){
    try {

        await mailSender(this.email,'Verification Email from Community Cares',this.otp)
        .then((res)=> console.log('email sent successfully',res)
        )
        .catch((e)=>console.log(e))
       
        
    } catch (error) {
        console.log('error occured while sending mail : ',error);
        throw error;
    }
})


module.exports=mongoose.model("OTP",otpSchema) ;