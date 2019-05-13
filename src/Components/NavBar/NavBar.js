import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import noImage from '../../images/no-image.png'
import masterChief from '../../images/masterchief.jpg';

const NavBar = (props) => (
  <div className="navbar-container">
    <div className="navbar-option-container">
      <img src={masterChief} alt="of person" className="navbar-profile-img"/>
      <Link to="/profile"><img src={noImage} alt="something" className="navbar-image"/></Link>
      <Link to="/dashboard"><img src={noImage} alt="something" className="navbar-image"/></Link>
      <Link to="/Calendar"><img src={noImage} alt="something" className="navbar-image"/></Link>
      <Link to="/"><img src={noImage} alt="something" className="navbar-image"/></Link>
    </div>
  </div>
)

export default NavBar;
