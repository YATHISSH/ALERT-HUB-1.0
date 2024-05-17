import Info from './ProfileComponents/InfoProfile/Info'
import UserHome from '../UserHome/UserHome'

import Profile from "../../assets/profile.png"
import { useEffect, useState } from 'react'
import "../Profile/ProfileMiddle.css"
import axios from 'axios'
import moment from 'moment'
import ProfileInputPost from './ProfileComponents/ProfileInputPost'

const ProfileMiddle = ({following,
                        search,
                        images,
                        setImages,
                        profileImg,
                        setProfileImg,
                        name,
                        setName,
                        userName,
                        setUserName,
                        modelDetails,
                        setModelDetails}) => {

  const [userPostData ,setUserPostData] =useState(
    []
  );
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userId = sessionStorage.getItem('name'); // Adjust the storage key as per your implementation
        //console.log(userId);
        const response = await axios.get(`http://localhost:5000/api/posts/${userId}`);
        console.log(response.data);
        setUserPostData(response.data);
        //console.log(userPostData);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);
  const [body,setBody] =useState("")
  const [importFile,setImportFile] =useState("")
  
 

  const handleSubmit =(e)=>{
    e.preventDefault()

  
    const id =userPostData.length ? userPostData[userPostData.length -1]._id +1 :1
    const username=sessionStorage.getItem('name')
    const profilepicture=Profile
    const datetime=moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow()
    const img= images ? {img:URL.createObjectURL(images)} : null

   
    const obj ={id:id,
               profilepicture:profilepicture,
               username:username,
               datetime:datetime,
               img:img && (img.img),
               body:body,
               like:0,
               comment:0
              }

    const insert =[...userPostData,obj]
    setUserPostData(insert)
    setBody("")
    setImages(null)
  }


  

  const [searchResults,setSearchResults] =useState("")
    
  useEffect(() => {
    const searchData = userPostData.filter((val) => (
      (val.body && val.body.toLowerCase().includes(search.toLowerCase())) ||
      (val.username && val.username.toLowerCase().includes(search.toLowerCase()))
    ));
    setSearchResults(searchData);
  }, [userPostData, search]);
  

   

    

  return (
    <div className='profileMiddle'>
        <Info 
        modelDetails ={modelDetails}
        setModelDetails={setModelDetails}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        userPostData={userPostData}
        following={following}
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        />
        
        <ProfileInputPost
        modelDetails={modelDetails}
        profileImg={profileImg}
        handleSubmit={handleSubmit}
        body ={body}
        setBody ={setBody}
        importFile ={importFile}
        setImportFile ={setImportFile}
        images={images}
        setImages={setImages}
        />
        
        <UserHome 
        modelDetails={modelDetails}
        profileImg={profileImg}
        setUserPostData={setUserPostData}
        userPostData={userPostData}
        images={images}
        />
    </div>
  )
}

export default ProfileMiddle