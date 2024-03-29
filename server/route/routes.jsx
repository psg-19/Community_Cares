const express=require('express');
const router=express.Router();





const {sendOtp,signUp,login}=require('../controllers/Auth.jsx');

const {createPost,likePost,deletePost,updatePost}=require('../controllers/Posts.jsx');
const {BootUp}=require('../controllers/Bootup.jsx');
const {connectedPosts,getConnectedPostsUser,getAllConnectedPosts}=require('../controllers/ConnectedPosts.jsx');
const {isDonor}=require('../middlewares/auth.jsx');
const {deleteUser,getUserPosts,updateUser,getUser,getAllRecieverPosts,getAllDonorPosts}=require('../controllers/fetchinfo.jsx')




router.post('/sendOtp',sendOtp);
router.post('/signUp',signUp);
router.post('/login',login);
router.post('/createPost',createPost);
router.post('/BootUp',BootUp);
router.post('/connectedPosts',isDonor,connectedPosts);
router.post('/likePost',likePost);
router.put('/updatePost',updatePost);
router.get('/getUserPosts',getUserPosts);
router.delete('/deletePost',deletePost);
router.get('/getUser',getUser);
router.put('/updateUser',updateUser);
router.delete('/deleteUser',deleteUser);
router.get('/getAllRecieverPosts',getAllRecieverPosts);
router.get('/getAllDonorPosts',getAllDonorPosts);
router.get('/getConnectedPostsUser',getConnectedPostsUser);
router.get('/getAllConnectedPosts',getAllConnectedPosts);



module.exports=router;