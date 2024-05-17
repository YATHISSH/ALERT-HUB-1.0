import React from 'react'
import "../Notification/Notification.css"
import {AiOutlineHome} from "react-icons/ai"
import { Link } from 'react-router-dom'

const Notification = () => {
  
  return (
    <div className="noti-overall">
      <div className='nav-section'>
        <Link to="/home" style={{textDecoration:"none"}} className='noti-div'><AiOutlineHome className='noti-Home-Icon'/></Link>
        <Link to="/profile" style={{textDecoration:"none"}}><img src={""} alt="" /></Link>
      </div>

    <div className="notification-group">
      <h1>notification</h1>
      <div className="notification-section">
        <div className="notification-msg">
            <img src={""} alt="" />
            <p>Mike Tysion liked <span className='noti-like'>your profile picture</span><small><br />10 mins ago</small></p>
        </div>

        <div className="notification-msg">
            <img src={""} alt="" />
            <p>Violet liked <span className='noti-like'>your profile picture</span><br /><small>1 day ago</small></p>
        </div>

        <div className="notification-msg">
            <img src={""} alt="" />
            <p>violet liked <span className='noti-like'>your cover picture</span><br /><small>20s ago</small></p>
        </div>

        <div className="notification-msg">
            <img src={""} alt="" />
            <p>Brandon liked <span className='noti-like'>your profile picture</span><br /><small>5h ago</small></p>
        </div>

        <div className="notification-msg">
            <img src={""} alt="" />
            <p>Camille liked <span className='noti-like'>your profile picture</span><br /><small>1 min ago</small></p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Notification