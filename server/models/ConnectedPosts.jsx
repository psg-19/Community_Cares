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
});

module.exports=mongoose.model('ConnectedPosts',connectedPostsSchema)