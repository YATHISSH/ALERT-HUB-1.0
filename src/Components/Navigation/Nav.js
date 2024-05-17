import React, { useState } from 'react';
import "../Navigation/Nav.css";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import Profile from "../../assets/profile.png";

const Nav = ({search, setSearch, setShowMenu, profileImg, score, setScore}) => {
  const [showXP, setShowXP] = useState(false);
  const [enterKeyPressed, setEnterKeyPressed] = useState(false); 

  const toggleXP = () => {
    setShowXP(!showXP);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // When "Enter" key is pressed, set the search value
      e.preventDefault();
      setSearch(e.target.value);
      setEnterKeyPressed(true);
    }
  };

  return (
    <nav>
      <div className="n-logo">
        <Link to="/home" className='logo' style={{color:"black",textDecoration:"none"}}>
          <h1>ALERT <span>HUB</span></h1>
        </Link>
      </div>

      <div className="n-form-button">
        <form className='n-form' onSubmit={(e)=>e.preventDefault()}>
          <SearchIcon className='search-icon'/>
          <input 
            type="text"
            placeholder='Search post'
            id='n-search'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>

      <div className="fire-icon-container" onClick={toggleXP}>
        <FaFire className="fire-icon" /> {/* Display the fire icon */}
        {showXP && (
          <span className="score" style={{fontFamily:"algerian",color:"white",margin:"15px"}}>
            {sessionStorage.getItem('score')} XP
          </span>
        )}
      </div>

      <div className="n-profile">
        <Link to="/profile"> 
          <FaUserCircle className='n-img' style={{ fontSize: "38px", color: "white" }} />
        </Link>
      </div>
      
    </nav>
  )
}

export default Nav;