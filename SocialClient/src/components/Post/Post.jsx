import React from 'react';
import CommentIcon from '../../img/comment.png';
import ShareIcon from '../../img/share.png';
import HeartIcon from '../../img/like.png';
import NotLikeIcon from '../../img/notlike.png';

const Post = ({ data }) => {
  const isImage = data.media_type && data.media_type.startsWith('image');
  const mediaUrl = isImage ? data.media_url : data.mediaUrl; // Use media_type as image URL if it's not a valid Cloudinary URL

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {isImage ? (
        <img className="w-full" src={mediaUrl} alt="" />
      ) : (
        <video className="w-full" controls>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="flex items-center space-x-8 mt-2">
        <img src={data.liked ? HeartIcon : NotLikeIcon} alt="" />
        <img src={CommentIcon} alt="" />
        <img src={ShareIcon} alt="" />
      </div>


      <p className="text-gray-500 text-sm">{data.likes} likes</p>

      <div className="mt-2">
        <p>
          <strong>{data.content}</strong>
        </p>
        <p>{data.desc}</p>
      </div>
    </div>
  );
};

export default Post;




























// import React from 'react'
// import './Post.css'
// import Comment from '../../img/comment.png'
// import Share from '../../img/share.png'
// import Heart from '../../img/like.png'
// import NotLike from '../../img/notlike.png'


// const Post = ({data}) => {
//   return (
//     <div className="Post">
//         <img src={data.img} alt="" />


//         <div className="postReact">
//             <img src={data.liked?Heart: NotLike} alt="" />
//             <img src={Comment} alt="" />
//             <img src={Share} alt="" />
//         </div>


//         <span style={{color: "var(--gray)", fontSize: '12px'}}>{data.likes} likes</span>

//         <div className="detail">
//             <span><b>{data.name}</b></span>
//             <span> {data.desc}</span>
//         </div>
//     </div>
//   )
// }

// export default Post