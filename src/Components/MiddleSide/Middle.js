import React, { useEffect, useState } from 'react'
import InputPost from '../Post/InputPost'
import Homepage from "../Home/Homepage"
import "../MiddleSide/Middle.css"

import axios from 'axios';

const Middle = ({handleSubmit,
                body,
                setBody,
                setImportFile,
                posts,
                setPosts,
                search,
                images,
                setImages,
                handleImageChange,
                emptImg,
                setEmptImg,
                setFriendsProfile
              }) => {
    
  
    const [searchResults,setSearchResults] =useState("")
    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (search.trim() !== '') {
            const response = await axios.get(
              `http://localhost:5000/api/search?search=${encodeURIComponent(search)}`,
              { 
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            setSearchResults(response.data);
          }
          else{
            setSearchResults([]);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [search]);
    
  
  return (
    <div className='M-features'>
        <InputPost
        handleSubmit={handleSubmit}
        body ={body}
        setBody ={setBody}
        setImportFile ={setImportFile}
        images={images}
        handleImageChange={handleImageChange}
        emptImg ={emptImg}
        setEmptImg={setEmptImg}
        setImages={setImages}
        />

        <Homepage 
        posts ={posts}
        setPosts={setPosts}
        setFriendsProfile={setFriendsProfile}
        images={images}
        searchResults={searchResults}
        />

    </div>
  )
}

export default Middle