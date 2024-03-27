const mongoose=require('mongoose');

const donorPostsSchema=new mongoose.Schema({
email:{
type:String,
required:true,
trim:true
},
    posts:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'

        }
    
})

module.exports=mongoose.model('DonorPosts',donorPostsSchema);