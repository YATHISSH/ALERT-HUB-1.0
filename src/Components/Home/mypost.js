import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import Left from '../LeftSide/Left';
import Nav from '../Navigation/Nav';
import UserHome from '../UserHome/UserHome';
import ProfileImg from "../../assets/profile.png"

const MyPostsPage = () => {
  const [images,setImages] =  useState(null)
  const [profileImg,setProfileImg] =useState(ProfileImg)
  const [modelDetails,setModelDetails] = useState(
    {
      ModelName:sessionStorage.getItem('name'),
      ModelEmail:sessionStorage.getItem('email'),
      ModelScore:sessionStorage.getItem('score'),
    }
  )
  const [userPostData,setUserPostData] = useState([]);
  useEffect(()=>{
    console.log("my posts called");
    const fetchedposts= async() => {
      try{
        const userId = sessionStorage.getItem('name');
        const response = await axios.get( `http://localhost:5000/api/posts/${userId}`);
        console.log(response.data);
        setUserPostData(response.data);
      }
      catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };
    fetchedposts();
  },[]);

  const [search,setSearch] =useState("")
  const [showMenu,setShowMenu] =useState(false)
  
  return (
    <div className="interface" >
        <Nav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        />
    <div className="home">
      <Left/>
    <div><UserHome
      modelDetails={modelDetails}
      profileImg={profileImg}
      setUserPostData={setUserPostData}
      userPostData={userPostData}
      images={images}/>
    </div>
    </div>
    </div>
  );
};

export default MyPostsPage;