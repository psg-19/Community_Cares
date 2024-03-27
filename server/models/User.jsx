const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    phoneNo:{
        type:String,
        trim:true,
        required:true
    },
   
    password:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        enum:['Donor','Reciever']
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    profileUrl:{
        type:String,
        trim:true,
        
    }

})

module.exports=mongoose.model('User',userSchema);