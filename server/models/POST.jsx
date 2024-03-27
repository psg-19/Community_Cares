const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    imageUrl:{
        type:String,
        trim:true,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
    expiresAt:{
        type:Date,
        required:true,
       default:new Date(new Date(new Date()).getTime()+(24+7-new Date((Date.now())).getHours())*60*60*1000 -(new Date((Date.now())).getMinutes()*60*1000)).getTime()
        // default:new Date(Date.now()).getTime()
            },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

module.exports=mongoose.model('Post',postSchema);