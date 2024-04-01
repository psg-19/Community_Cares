import { Navbar } from './components/Navbar';
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { DonorPosts } from './pages/DonorPosts';
import { RecieverPosts } from './pages/RecieverPosts';


function App() {
 
  return (
    <div className="" >

<Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/donorPost' element={<DonorPosts/>}></Route>
        <Route path='/recieverPost' element={<RecieverPosts/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
