import { useState } from 'react'
import Left from '../../Components/LeftSide/Left'
import ProfileMiddle from '../../Components/Profile/ProfileMiddle'

import Nav from '../../Components/Navigation/Nav'
import "../Profile/Profile.css"
import ProfileImg from "../../assets/profile.png"

const Profile = () => {

  const [following,setFollowing] =useState(3)
  const [search,setSearch] =useState("")

  const [showMenu,setShowMenu] =useState(false)

  const [images,setImages] =  useState(null)

  const [name,setName]= useState("")
  const [userName,setUserName]= useState("")
  const [profileImg,setProfileImg] =useState(ProfileImg)

  const [modelDetails,setModelDetails] = useState(
    {
      ModelName:sessionStorage.getItem('name'),
      ModelEmail:sessionStorage.getItem('email'),
      ModelScore:sessionStorage.getItem('score'),
    }
  )

  return (
    <div className='interface'>
        <Nav
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        profileImg={profileImg}
        />
      <div className="home">
        <Left 
        following={following}
        setFollowing={setFollowing}
        profileImg={profileImg}
        modelDetails={modelDetails}
        
        />

        <ProfileMiddle 
        following={following}
        search={search}
        images={images}
        setImages={setImages}
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        modelDetails={modelDetails}
        setModelDetails={setModelDetails}
        />
        
       
      </div>
    </div>
  )
}


export default Profile