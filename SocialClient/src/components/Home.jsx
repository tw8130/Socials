import React from 'react';
//import { TECollapse, TERipple } from "tw-elements-react";
function HomePage({onLogout}) {
const handleLogout =()=>{
    onLogout();
}

  return( 
    <>
  <h1>Welcome to the landing page!</h1>
  <button className='logout-button' onClick={handleLogout}>Logout</button>
  </>
  );
}

export default HomePage;