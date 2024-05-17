import React from 'react'
import Feedposts from './Feedposts'
import "../Home/Homepage.css"


const Homepage = ({posts,setPosts,setFriendsProfile,images, searchResults}) => {
  console.log("searchresults:",searchResults)
  console.log(posts)

  const displayPosts = searchResults.length > 0 ? searchResults : posts;
  return (
    <main className='homepage'>
        {displayPosts && displayPosts.length ? (
        <Feedposts images={images} posts={displayPosts} setPosts={setPosts} />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>
          {searchResults.length === 0 ? 'No search results found' : 'NO POSTS ARE HERE'}
        </p>
      )}
    </main>
  )
}

export default Homepage