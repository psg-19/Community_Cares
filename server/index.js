const express=require('express');
const app=express();
const cors=require('cors')
require('dotenv').config();

var cookieParser = require('cookie-parser');

//------------miidleware-----------
const fileUpload=require('express-fileupload');

app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:'/tmp/'
    }
    ));



    app.use(express.json());
    app.use(cookieParser());
    
    
    
    app.use(cors({
      origin: "https://community-cares-9y35.vercel.app",
   
      optionsSuccessStatus: 200,
      credentials: true 
    }));

    const router=require('./route/routes.jsx')
    
    app.use('/api/v1',router)


//--------------db connect-----------------
const dbConnect=require('./config/database.jsx');
dbConnect();

const cloudinary=require('./middlewares/cloudinary.jsx');
cloudinary.cloudinaryConnect();

//-------------server started---------------------

app.listen(process.env.PORT,()=>{
    // console.log(`server started at port ${process.env.PORT}`)
})


module.exports= app;