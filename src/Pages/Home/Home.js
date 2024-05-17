import {  useState, useEffect } from 'react'
import Profile from "../../assets/profile.png"
import "../Home/Home.css"
import Left from "../../Components/LeftSide/Left"
import Middle from "../../Components/MiddleSide/Middle"
import Nav from '../../Components/Navigation/Nav'
import axios from 'axios'
import moment from 'moment/moment'

const Home = ({setFriendsProfile}) => {
    console.log(sessionStorage.getItem('pincode'));
    const [posts,setPosts] = useState(
        []
      );
      useEffect(() => {
        const fetchUserPosts = async () => {
          try {
            const userPincode = sessionStorage.getItem('pincode'); // Adjust the storage key as per your implementation
            console.log(userPincode);
            const response = await axios.get(`http://localhost:5000/api/posts/pin/${userPincode}`);
            console.log(response.data);
            setPosts(response.data);
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
        
        
        const id =posts.length ? posts[posts.length -1].id +1 :1
        const username=sessionStorage.getItem('name')
        const profilepicture=Profile
        const datetime=moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow()
        const img =images ? {img:URL.createObjectURL(images)} : null
        
        const obj ={id:id,
                   profilepicture:profilepicture,
                   username:username,
                   datetime:datetime,
                   img:img && (img.img),
                   body:body,
                   like:0,
                   comment:0
                  }

        

        const insert =[...posts,obj]
        setPosts(insert)
        setBody("")
        setImages(null)

      }
   
   const [search,setSearch] =useState("")

    
  const [following,setFollowing] =useState("")
        
  const [showMenu,setShowMenu] =useState(false)
  const [images,setImages] =  useState(null)

  return (
    <div className='interface'>
        <Nav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        />

    <div className="home">
   
        <Left />

        <Middle 
        handleSubmit={handleSubmit}
        body ={body}
        setBody ={setBody}
        importFile ={importFile}
        setImportFile ={setImportFile}
        posts={posts}
        setPosts={setPosts}
        search={search}
        images={images}
        setImages={setImages}

        />
    </div>

    </div>
  )
}

export default Home