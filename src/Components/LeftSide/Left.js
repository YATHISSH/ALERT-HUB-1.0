import React, { useState, useEffect } from 'react';
import '../LeftSide/Left.css';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BsPostcardHeart } from 'react-icons/bs';
import { AiOutlineIssuesClose } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { BsMoonStars } from "react-icons/bs";
import { MdShieldMoon } from 'react-icons/md';
import { MdSpaceDashboard } from "react-icons/md";

const Left = ({ profileImg, modelDetails }) => {
  const [name, setName] = useState('');
  const [btnActive, setBtnActive] = useState('#');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    setName(storedName);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`L-features ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
        <div onClick={() => setBtnActive('#')} id="L-box" className={btnActive === '#' ? 'active' : ''}>
          <AiOutlineHome className="margin" />
          <span>Home</span>
        </div>
      </Link>

      {/* <div id="L-box" onClick={toggleTheme} className={btnActive === '#explore' ? 'active' : ''}>
        <BsMoonStars style={{ color: 'black' }} className="margin" />
        <span style={{ color: 'black' }}>Theme</span>
      </div> */}

      <Link to="/myposts">
        <div id="L-box" onClick={() => setBtnActive('#saved')} className={btnActive === '#saved' ? 'active' : ''}>
          <BsPostcardHeart style={{ color: 'black' }} className="margin" />
          <span style={{ color: 'black' }}>My Posts</span>
        </div>
      </Link>

      <Link to="/upvotedposts">
        <div id="L-box" onClick={() => setBtnActive('#trending')} className={btnActive === '#trending' ? 'active' : ''}>
          <FiTrendingUp style={{ color: 'black' }} className="margin" />
          <span style={{ color: 'black' }}>My Upvotes</span>
        </div>
      </Link>
      {/* <Link to="/dashboard">
        <div id="L-box" onClick={() => setBtnActive('#saved')} className={btnActive === '#lists' ? 'active' : ''}>
          < MdSpaceDashboard style={{ color: 'black' }} className="margin" />
          <span style={{ color: 'black' }}>Dashboard</span>
        </div>
      </Link> */}

      <Link to="/terms">
        <div id="L-box" onClick={() => setBtnActive('#saved')} className={btnActive === '#lists' ? 'active' : ''}>
          <AiOutlineIssuesClose style={{ color: 'black' }} className="margin" />
          <span style={{ color: 'black' }}>About ALERTHUB 1.0</span>
        </div>
      </Link>
      <Link to="/" >
      <div id="L-box" onClick={() => setBtnActive('#settings')} className={btnActive === '#settings' ? 'active' : ''}>
        <IoLogOutOutline style={{ fontWeight: 'bolder',color:"black"}} className="margin" />
        <span style={{ color: 'black' }}>Logout</span>
      </div></Link>

      <div className="left-user">
        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="user-name-userid">
            <FaUserCircle style={{ fontSize: '40px', color: 'rgb(8, 81, 113)' }} />
            <div className="L-user">
              <h1>{name}</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Left;
