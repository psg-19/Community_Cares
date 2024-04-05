const mongoose=require('mongoose');
require('dotenv').config()

dbConnect=()=>{
//   console.log('--------------------',process.env.DATABASE_URL)
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

    .then(()=>console.log('db connection successfull'))
   
    .catch((error)=>{console.log('db connection problem ---> ',error)
    process.exit(1);})
   
}

module.exports=dbConnect;
