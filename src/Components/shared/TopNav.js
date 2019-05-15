import React from 'react';

import './TopNav.css';

export default function TopNav(props) {

  const section1 = 
    <div className="myProfileFlagContainer">
      <div className="flagTriangle"></div>
      <button name={props.name1} onClick={(e) => updateContent(e.target.name)} className="myProfileFlag">{props.name1}</button>
    </div>

  const section2 =
    <div className="myProfileFlagContainer">
      <div className="flagTriangle two-triangle"></div>
      <button name={props.name2} onClick={(e) => updateContent(e.target.name)} className="myProfileFlag two">{props.name2}</button>
    </div>

  const section3 = 
    <div className="myProfileFlagContainer">
      <div className="flagTriangle three-triangle"></div>
      <button name={props.name3} onClick={(e) => updateContent(e.target.name)} className="myProfileFlag three">{props.name3}</button>
    </div>

  const section4 = 
    <div className="myProfileFlagContainer">
      <div className="flagTriangle four-triangle"></div>
      <button name={props.name4} onClick={(e) => updateContent(e.target.name)} className="myProfileFlag four">{props.name4}</button>
    </div>

  function updateContent(name) {
    if(props.setComponent) {
      props.setComponent(() => {
        return name
      })
    }
  }

  switch(props.number) {
    case 1: {
      return ( 
        <>
        <nav className="topNav-container">
          <div className="triangle-container">
            {section1}
          </div>
        </nav>
        <hr className="topNav-hr"/>
        </>
      )
    }
    case 2: {
      return ( 
        <>
        <nav className="topNav-container">
          <div className="triangle-container">
            {section1}
            {section2}
          </div>
        </nav>
        <hr className="topNav-hr"/>
        </>
      )
    }
    case 3: {
      return (
        <>
        <nav className="topNav-container">
          <div className="triangle-container">
            {section1}
            {section2}
            {section3}
          </div>
        </nav>
        <hr className="topNav-hr"/>
        </>
      )
    }
    case 4: {
      return (
        <>
        <nav className="topNav-container">
  
          <div className="triangle-container">
            {section1}
            {section2}
            {section3}
            {section4}
          </div>
        </nav>
        <hr className="topNav-hr"/>
        </>
      )
    }
    default: {
      return;
    }
  }
}