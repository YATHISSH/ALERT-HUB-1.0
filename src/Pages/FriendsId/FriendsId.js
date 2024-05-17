import React from 'react'
import Nav from '../../Components/Navigation/Nav'
import Left from '../../Components/LeftSide/Left'
import FriendsProfileMiddle from '../../Components/FriendsProfile/FriendsProfileMiddle'
import { useState } from 'react'

import "../FriendsId/FriendsId.css"

const FriendsId = ({friendProfile}) => {

  const [search,setSearch] =useState("")

  const [showMenu,setShowMenu] =useState(false)
  const [following,setFollowing] =useState("")

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
            {/* <FriendsProfileMiddle friendProfile={friendProfile}/> */}
            
        </div>
    </div>
  )
}

export default FriendsId