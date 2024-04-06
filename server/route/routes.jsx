const express=require('express');
const router=express.Router();





const {sendOtp,signUp,login}=require('../controllers/Auth.jsx');

const {createPost,likePost,deletePost,updatePost}=require('../controllers/Posts.jsx');
const {BootUp}=require('../controllers/Bootup.jsx');
const {connectedPosts,getConnectedPostsUser,getAllConnectedPosts,likeConnectedPost}=require('../controllers/ConnectedPosts.jsx');
const {isDonor}=require('../middlewares/auth.jsx');
const {deleteUser,getUserPosts,updateUser,getUser,getAllRecieverPosts,getAllDonorPosts}=require('../controllers/fetchinfo.jsx')



router.get('/',(req,res)=>{
    res.cookie('hii',"yyyy").send("welcome to home page")  
})
router.post('/sendOtp',sendOtp);
router.post('/signUp',signUp);
router.post('/login',login);
router.post('/createPost',createPost);
router.get('/BootUp',BootUp);
router.post('/connectedPosts',isDonor,connectedPosts);
router.post('/likePost',likePost);
router.put('/updatePost',updatePost);
router.post('/getUserPosts',getUserPosts);
router.put('/deletePost',deletePost);
router.post('/getUser',getUser);
router.put('/updateUser',updateUser);
router.delete('/deleteUser',deleteUser);
router.get('/getAllRecieverPosts',getAllRecieverPosts);
router.get('/getAllDonorPosts',getAllDonorPosts);
router.post('/getConnectedPostsUser',getConnectedPostsUser);
router.get('/getAllConnectedPosts',getAllConnectedPosts);
router.post('/likeConnectedPost',likeConnectedPost);



module.exports=router;