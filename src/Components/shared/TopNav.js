import React from 'react';

import './TopNav.css';

const TopNav = props => {
  return(
    <>
    <nav className="topNav-container">

      <div className="triangle-container">
        <div className="myProfileFlagContainer">
          <div className="flagTriangle"></div>
          <button className="myProfileFlag">Calendar</button>
        </div>
        <div className="myProfileFlagContainer">
          <div className="flagTriangle two-triangle"></div>
          <button className="myProfileFlag two">Grades</button>
        </div>
        <div className="myProfileFlagContainer">
          <div className="flagTriangle three-triangle"></div>
          <button className="myProfileFlag three">Assignments</button>
        </div>
      </div>
    </nav>
    <hr className="topNav-hr"/>
    </>
  )
}

export default TopNav;