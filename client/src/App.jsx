import { Navbar } from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { DonorPosts } from './pages/DonorPosts';
import { UserConnectedPosts } from './pages/UserConnectedPosts';
import { UserPosts } from './pages/UserPosts';
import { RecieverPosts } from './pages/RecieverPosts';

import PrivateRoute from './components/PrivateRoute';
import { ConnectedPosts } from './pages/ConnectedPosts';
import {PrivateRoute2} from './components/PrivateRoute2'
import { CreatePost } from './pages/CreatePost';
import { EditPost } from './pages/EditPost';
import { ForgotPassword } from './pages/ForgotPassword';



function App() {



if (performance.navigation.type === 1) {
 
 
      
      window.location.href = '/';
  
}

  

  return (
    <div className=" bg-richblack-800 h-[100vh] " >

<Navbar ></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        
        <Route path='/profile' element={<PrivateRoute >
        <Profile/>
        </PrivateRoute>}></Route>
       
        <Route path='/login' element={<PrivateRoute2 ><Login/></PrivateRoute2>}></Route>
        <Route path='/forgotPassword' element={<PrivateRoute2 ><ForgotPassword/></PrivateRoute2>}></Route>
        <Route path='/signUp' element={<PrivateRoute2 ><SignUp/></PrivateRoute2>}></Route>
        <Route path='/connectedPosts' element={<ConnectedPosts/>}></Route>
        <Route path='/donorPost' element={<DonorPosts/>}></Route>
        <Route path='/recieverPost' element={<RecieverPosts/>}></Route>
        <Route path='/userConnectedPosts' element={
          <PrivateRoute ><UserConnectedPosts/></PrivateRoute>
        }></Route>
        <Route path='/userPosts' element={
      <PrivateRoute >  <UserPosts/></PrivateRoute>}></Route>
      
      <Route path='/createPosts' element={
       
       <PrivateRoute ><CreatePost/></PrivateRoute>   
        
      }>


      </Route>

      <Route path='editPost' element={<EditPost/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
