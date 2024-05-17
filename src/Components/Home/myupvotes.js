import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import Left from '../LeftSide/Left';
import Nav from '../Navigation/Nav';
import UserHome from '../UserHome/UserHome';
import ProfileImg from "../../assets/profile.png"

const UpvotedPostsPage = () => {
  const [images,setImages] =  useState(null)
  const [profileImg,setProfileImg] =useState(ProfileImg)
  const [userPostData,setUserPostData] = useState([]);
  const [modelDetails, setModelDetails] = useState({
    ModelName: sessionStorage.getItem('name'),
    ModelEmail: sessionStorage.getItem('email'),
    ModelScore: sessionStorage.getItem('score'),
  });
  useEffect(()=>{
    console.log("my posts called");
    const fetchedposts= async() => {
      try{
        const userEmail = sessionStorage.getItem('email');
        const response = await axios.get(`http://localhost:5000/api/user/upvotedPosts/${userEmail}`);
        console.log("myupvotes:",response.data);
        setUserPostData(response.data);
        // const postCreatorDetails = response.data.length > 0 ? response.data[0].userDetails : {};
        // setModelDetails({
        //   ModelName: postCreatorDetails.name,
        //   ModelEmail: postCreatorDetails.email,
        //   ModelScore: sessionStorage.getItem('score'),
        // });
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

export default UpvotedPostsPage;