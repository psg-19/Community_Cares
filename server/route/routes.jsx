const express=require('express');
const router=express.Router();





const {sendOtp}=require('../controllers/Auth.jsx')
const {signUp}=require('../controllers/Auth.jsx')
const {login}=require('../controllers/Auth.jsx')
const {createPost}=require('../controllers/Posts.jsx')
const {BootUp}=require('../controllers/Bootup.jsx')





router.post('/sendOtp',sendOtp);
router.post('/signUp',signUp);
router.post('/login',login);
router.post('/createPost',createPost);
router.post('/BootUp',BootUp);

module.exports=router;