const express=require('express');
const router=express.Router();





const {sendOtp}=require('../controllers/Auth.jsx');
const {signUp}=require('../controllers/Auth.jsx');
const {login}=require('../controllers/Auth.jsx');
const {createPost}=require('../controllers/Posts.jsx');
const {BootUp}=require('../controllers/Bootup.jsx');
const {connectedPosts}=require('../controllers/ConnectedPosts.jsx');
const {likePost}=require('../controllers/Posts.jsx');
const {isDonor}=require('../middlewares/auth.jsx');
const {updatePost}=require('../controllers/Posts.jsx');
const {getUserPosts}=require('../controllers/fetchinfo.jsx');
const{deletePost}=require('../controllers/Posts.jsx');
const {getUser}=require('../controllers/fetchinfo.jsx');
const {updateUser}=require('../controllers/fetchinfo.jsx');
const {deleteUser}=require('../controllers/fetchinfo.jsx')


router.post('/sendOtp',sendOtp);
router.post('/signUp',signUp);
router.post('/login',login);
router.post('/createPost',createPost);
router.post('/BootUp',BootUp);
router.post('/connectedPosts',connectedPosts);
router.post('/likePost',likePost);
router.post('/updatePost',updatePost);
router.get('/getUserPosts',getUserPosts);
router.delete('/deletePost',deletePost);
router.get('/getUser',getUser);
router.post('/updateUser',updateUser);
router.delete('/deleteUser',deleteUser);


module.exports=router;