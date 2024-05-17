import React, { useState } from 'react'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import FriendsId from "./Pages/FriendsId/FriendsId"
import { Route, Routes } from 'react-router-dom'
import Notification from './Pages/Notification/Notification'
import Login from './Pages/RegisterPage/Login'
import SignUp from './Pages/RegisterPage/SignUp'
import UpvotedPostsPage from './Components/Home/myupvotes'
import MyPostsPage from './Components/Home/mypost'
import TermsPage from './Components/Home/Terms'
import Dashboard from './Components/Home/dashboard'



const App = () => {
  const [friendProfile,setFriendsProfile] =useState([])

  return (
    <div className='App'>
      <Routes>
        <Route path='/home' element={<Home setFriendsProfile={setFriendsProfile}/> } />
        
        <Route path='/profile' element={ <Profile /> } />

        <Route path='/friendsId' element={<FriendsId friendProfile={friendProfile} />} />
      
        {/* <Route path='/notification' element={<Notification />} /> */}

        <Route path="/upvotedposts" element={<UpvotedPostsPage/>} />
        <Route path="/terms" element={<TermsPage />}/>
        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        
        <Route path="/myposts" element={<MyPostsPage/>} />

        <Route path='/' element={<Login />} />

        <Route path='/signup' element={<SignUp />} />
        
      </Routes>
    </div>
  )
}

export default App
