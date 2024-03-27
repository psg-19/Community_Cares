const mongoose=require('mongoose');

const recieverPostsSchema=new mongoose.Schema({
    posts:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'

        },
        email:{
            type:String,
            required:true,
            trim:true
            },
    
})

module.exports=mongoose.model('RecievrPosts',recieverPostsSchema);