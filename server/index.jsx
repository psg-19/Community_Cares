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
    
    
    const allowedOrigins=['https://community-cares-9y35.vercel.app','https://community-cares-9y35.vercel.app/donorPost',

    'https://community-cares-9y35.vercel.app/sendOtp',
    'https://community-cares-9y35.vercel.app/signUp',
    'https://community-cares-9y35.vercel.app/login',
    'https://community-cares-9y35.vercel.app/createPost',
    'https://community-cares-9y35.vercel.app/BootUp',
    'https://community-cares-9y35.vercel.app/connectedPosts',
    'https://community-cares-9y35.vercel.app/likePost',
    'https://community-cares-9y35.vercel.app/updatePost',
    'https://community-cares-9y35.vercel.app/getUserPosts'
    ,'https://community-cares-9y35.vercel.app/deletePost',
    'https://community-cares-9y35.vercel.app/getUser',
    'https://community-cares-9y35.vercel.app/updateUser',
    'https://community-cares-9y35.vercel.app/deleteUser',
    'https://community-cares-9y35.vercel.app/getAllRecieverPosts',
    'https://community-cares-9y35.vercel.app/getAllDonorPosts',
    'https://community-cares-9y35.vercel.app/getConnectedPostsUser',
    'https://community-cares-9y35.vercel.app/likeConnectedPost',
    'https://community-cares-9y35.vercel.app/isLogged',
    'https://community-cares-9y35.vercel.app/logout',
    'https://community-cares-9y35.vercel.app/forgotPassword',
    'https://community-cares-9y35.vercel.app/sendOtpForForgotPassword'
];


app.use(cors({
    // origin: 'http://localhost:3000',
    origin: 
    


    function (origin, callback) {
        // Check if the request origin is allowed
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    , 
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
    console.log(`server started at port ${process.env.PORT}`)
})

//---------dummy route----------------
// app.get('/',(req,res)=>{
//    res.cookie('hii',"yyyy").send("welcome to home page")  
// });


module.exports= app;