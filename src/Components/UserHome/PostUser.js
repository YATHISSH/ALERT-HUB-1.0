import React from 'react'
import "../Home/Post.css"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { IoMdTrendingUp } from "react-icons/io";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';

import {PiSmileySad} from "react-icons/pi"
import {IoVolumeMuteOutline} from "react-icons/io5"
import {MdBlockFlipped} from "react-icons/md"
import {AiOutlineDelete} from "react-icons/ai"
import {MdReportGmailerrorred} from "react-icons/md"

import {LiaFacebookF} from "react-icons/lia"
import {FiInstagram} from "react-icons/fi"
import {BiLogoLinkedin} from "react-icons/bi"
import {AiFillYoutube} from "react-icons/ai"
import {RxTwitterLogo} from "react-icons/rx"
import {FiGithub} from "react-icons/fi"

// import img1 from "../../assets/Following/img-2.jpg"
// import img2 from  "../../assets/Following/img-3.jpg"
// import img3 from  "../../assets/Following/img-4.jpg"


import { useState } from 'react';
//import Comments from '../Comments/Comments';
import moment from 'moment';
import axios from 'axios';



const PostUser = ({posts,post,setPosts,profileImg,modelDetails,images}) => {
  console.log(post);

  //const [comments,setComments] =useState([])


  const [like,setLike] =useState(post.upvotes.length)
  const [unlike,setUnlike] =useState(false)
  const [upvoted,setUpvoted]=useState(false)
  const [alreadyUpvoted,setAlreadyUpvoted]=useState(false)
  const [filledLike,setFilledLike] =useState(<FavoriteBorderOutlinedIcon />)
  const [unFilledLike,setUnFilledLike] =useState(false)
  const [upvoteMessage, setUpvoteMessage] = useState('');

  const handlelikes= async ()=>{
    console.log("handlelikes called");
    try {
      const post_email = sessionStorage.getItem('email');
      // Send a request to your server to increment the upvotes for the post
      const response = await axios.post(
        `http://localhost:5000/api/posts/upvote/${post._id}`,
        { email: post_email },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      // Ensure the request was successful
      // if (!response.ok) {
      //   throw new Error('Failed to upvote post');
      // }

      // Update the local state with the updated upvotes count
      setLike(response.data.upvotes);
      setUpvoted(!upvoted);
      setUpvoteMessage(response.data.message);

    } catch (error) {
      console.error('Error upvoting post:', error.message);
    }
  };
  

  const [showDelete,setShowDelete] = useState(false)
  //const [showComment,setShowComment] = useState(false)


const handleDelete=(id)=>{
  const deleteFilter =posts.filter(val=> val.id !== id)
    setPosts(deleteFilter)
    setShowDelete(false)
  }
 
  const [commentInput,setCommentInput] =useState("")

  // const handleCommentInput=(e)=>{
  //    e.preventDefault()

  //   const id=comments.length ? comments[comments.length -1].id +1 : 1
  //   const profilePic =profileImg
  //   const username=modelDetails.ModelName
  //   const comment =commentInput
  //   const time= moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow()

  //   const commentObj ={
  //     id:id,
  //     profilePic:profilePic,
  //     likes:0,
  //     username:username,
  //     comment:comment,
  //     time:time
  //   }
  //   const insert =[...comments,commentObj]
  //   setComments(insert)
  //   setCommentInput("")
  // }

  const [socialIcons,setSocialIcons] = useState(false)



  return (
    <div className='post'>
      <div className='post-header'>
        <div className='post-user' style={{cursor:"pointer"}}>
            <img src={profileImg} className='p-img' alt="" />
            <h2>{post.userId}</h2>
            <p className='datePara'>{moment(post.createdAt).fromNow()}</p>
        </div>
         
         <div className='delete'>
         {showDelete && (
         <div className="options">
         <button><PiSmileySad />Not Interested in this post</button>
         <button><IoVolumeMuteOutline />Mute this user</button>
         <button><MdBlockFlipped />Block this user</button>
         <button onClick={()=>handleDelete(post.id)}><AiOutlineDelete />Delete</button>
         <button><MdReportGmailerrorred />Report post</button>
         </div>
         )}
          {/* <MoreVertRoundedIcon className='post-vertical-icon' onClick={()=>setShowDelete(!showDelete)}/> */}
         </div>
       </div>
       {
    
    }
        <p className='body'>
          {post.content && post.content.length <= 300
            ? post.content
            : post.content && `${post.content.slice(0, 300)}...`}
        </p>

        {post.filepath && (<img src={`http://localhost:5000/uploads/${post.filepath}`} alt="" className="post-img" />)}
      
      <div className="post-foot">
       <div className="post-footer">
        <div className="like-icons">
          <p className='heart' 
            onClick={handlelikes}
            style={{marginTop:"5px"}}
          >
              {}
          </p>
          <IoMdTrendingUp className='msg' onClick={handlelikes} />
          {upvoteMessage && (
          <p className={upvoteMessage === 'Upvoted!' ? 'upvote-success' : 'downvote-success'}>
            {upvoteMessage}
          </p>
        )}
          {/* <MessageRoundedIcon 
            onClick= {()=>setShowComment(!showComment)}
            className='msg'  
          /> */}


          <ShareOutlinedIcon 
            onClick={()=>setSocialIcons(!socialIcons)}
            className='share'  
          />

        {socialIcons && (
          
          <div className="social-buttons">        
    
            <a href="http://www.facebook.com" target="blank" className="social-margin"> 
              <div className="social-icon facebook">
                <LiaFacebookF className='social-links'/>
              </div>
            </a>
            
            <a href="https://pinterest.com/" target="blank"  className="social-margin">
              <div className="social-icon instagram">
                <FiInstagram className='social-links'/>
              </div>
            </a>
            
            <a href="http://linkedin.com/" className="social-margin" target="blank">
              <div className="social-icon linkedin">
                <BiLogoLinkedin className='social-links'/>
              </div> 
            </a>
         
            <a href="https://github.com/"  target="blank"  className="social-margin">
              <div className="social-icon github">
                <FiGithub className='social-links'/>
              </div>
            </a>
            
            <a href="http://youtube.com/" target="blank"  className="social-margin">
              <div className="social-icon youtube">
              <AiFillYoutube className='social-links'/>
              </div> 
            </a>
      
            <a href="http://twitter.com/" target="blank" className="social-margin">
              <div className="social-icon twitter">
              <RxTwitterLogo />
              </div> 
            </a>
       </div>
      )}
    </div>
        

        <div className="like-comment-details">
          <span className='post-like'>{like} people upvoted it</span>
          {/* <span className='post-comment'>{comments.length} comments</span> */}
        </div>
        
       {/* {showComment && (<div className="commentSection"> */}
        {/* <form onSubmit={handleCommentInput}>
          <div className="cmtGroup">
              <SentimentSatisfiedRoundedIcon className='emoji'
              />
              
              <input 
              type="text" 
              id="commentInput"
              required
              placeholder='Add a comment...'
              onChange={(e)=>setCommentInput(e.target.value)}
              value={commentInput}
               />
              
              <button type='submit'><SendRoundedIcon className='send' /></button> 
          
          </div>
        </form> */}

        {/* <div className="sticky">
          {comments.map((cmt)=>(
            <Comments 
            modelDetails={modelDetails}
            className="classComment"
            cmt={cmt}
            key={cmt.id}
            />
          ))}
          </div> */}
        </div>

      </div>     
    </div>
)}

export default PostUser