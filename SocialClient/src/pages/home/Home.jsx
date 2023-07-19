import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
const Home = ({onLogout}) => {
  const handleLogout =()=>{
    onLogout();
}
  return (
    <div className="Home">

        <ProfileSide/>
        <PostSide/>
        <RightSide/>
        <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home