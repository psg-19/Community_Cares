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
    
    
    


    const router=require('./route/routes.jsx')
    
    
    app.use(cors({
      // origin: 'http://localhost:3000',
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true 
    }));
    app.use('/api/v1',router)

//--------------db connect-----------------
const dbConnect=require('./config/database.jsx');
dbConnect();

const cloudinary=require('./middlewares/cloudinary.jsx');
cloudinary.cloudinaryConnect();

//-------------server started---------------------

app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`)
})

//---------dummy route----------------
// app.get('/',(req,res)=>{
//    res.cookie('hii',"yyyy").send("welcome to home page")  
// });


module.exports= app;