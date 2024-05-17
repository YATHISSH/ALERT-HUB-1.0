import React from 'react';
import PostUser from './PostUser';

const FeedUser = ({ modelDetails, profileImg, posts, setPosts, images }) => {
  return (
    <div className='feedposts'>
      {/* Check if posts is defined and has length */}
      {posts && posts.length ? (
        // Map through posts and render each post
        posts.map(post => (
          <div key={post._id}>
            <PostUser 
              images={`http://localhost:5000/uploads/${post.filepath}`}
              modelDetails={modelDetails}
              profileImg={profileImg}
              post={post}
              key={post._id} 
            />
            {/* ... other post details */}
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", marginBottom: "40px" }}>
          NO POSTS ARE HERE
        </p>
      )}
    </div>
  );
};

export default FeedUser;