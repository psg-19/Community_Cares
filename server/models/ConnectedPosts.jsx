const mongoose=require('mongoose');

const connectedPostsSchema=mongoose.Schema({
    donorEmail:{
        type:String,
        required:true,
        trim:true
    },

    donorPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    
    recieverEmail:{
        type:String,
        required:true,
        trim:true
    },
    recieverPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    expiresAt:{
        type:Date,
        required:true,
        default:new Date(new Date(new Date()).getTime()+(24+7-new Date((Date.now())).getHours())*60*60*1000 -(new Date((Date.now())).getMinutes()*60*1000)).getTime()
     
    }
});

module.exports=mongoose.model('ConnectedPosts',connectedPostsSchema)