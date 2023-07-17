import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//import Character from './components/Character';
//import CharacterDescription from "./components/CharacterDescription";
import SignUp from './components/SignUp';
import Login from './components/Login';
// import Comics from './components/Comics';
import Landing from "./components/Landing";
//import Home from './components/Home';
//import Profile from './components/Profile';
import Home from "./pages/home/Home";
//import Profile from "./pages/Profile/Profile";
import './App.css'; 




const App = () => {
  return (
    <Router>
      <div>
        <nav  className="navbar">
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/SignUp">Sign Up</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            {/* <li>
              <Link to="/Profile">Profile</Link>
            </li> */}
          </ul>
        </nav>
        <div className="App">
          <div className="blur" style={{top: '-18%', right: '0'}}></div>
          {/* <div className="blur" style={{top: '36%', left: '-8rem'}}></div> */}
          {/* <Home/> */}
          {/* <Profile/> */}
          {/* <Auth/> */}
        </div>
        <React.Fragment>
          <Routes>
          <Route path="/SignUp" element={<SignUp/>} />
          {/* <Route
            exact
            path="/characters/:id"
            element={<CharacterDescription />}
          /> */}
            <Route path="/Login" element={<Login/>} />
            <Route path="/Home" element={<Home/>} />
            {/* <Route path="/Profile" element={<Profile/>} /> */}
            <Route exact path="/" element={<Landing />} />
          </Routes>
        </React.Fragment>
      </div>
    </Router>
  );
};

export default App;