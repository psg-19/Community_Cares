const express=require('express');
const router=express.Router();





const {sendOtp}=require('../controllers/Auth.jsx')
const {signUp}=require('../controllers/Auth.jsx')
const {login}=require('../controllers/Auth.jsx')
const {createPost}=require('../controllers/Posts.jsx')
const {BootUp}=require('../controllers/Bootup.jsx')
const {connectedPosts}=require('../controllers/ConnectedPosts.jsx')
const {likePost}=require('../controllers/Posts.jsx')




router.post('/sendOtp',sendOtp);
router.post('/signUp',signUp);
router.post('/login',login);
router.post('/createPost',createPost);
router.post('/BootUp',BootUp);
router.post('/connectedPosts',connectedPosts);
router.post('/likePost',likePost);

module.exports=router;