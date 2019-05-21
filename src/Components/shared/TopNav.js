import React from 'react';

import './TopNav.scss';

export default function TopNav(props) {

  const section1 =
    <div className="option">
      <div className="triangle"></div>
      <button name={props.name1} onClick={(e) => updateContent(e.target.name)}>{props.name1}</button>
    </div>

  const section2 =
    <div className="option">
      <div className="triangle two"></div>
      <button name={props.name2} onClick={(e) => updateContent(e.target.name)} className="two">{props.name2}</button>
    </div>

  const section3 =
    <div className="option">
      <div className="triangle three"></div>
      <button name={props.name3} onClick={(e) => updateContent(e.target.name)} className="three">{props.name3}</button>
    </div>

  const section4 =
    <div className="option">
      <div className="triangle four"></div>
      <button name={props.name4} onClick={(e) => updateContent(e.target.name)} className="four">{props.name4}</button>
    </div>

  function updateContent(name) {
    if (props.setComponent) {
      props.setComponent(() => {
        return name
      })
    }
  }

  function applySections() {
    switch (props.number) {
      case 1: {
        return [section1]
      }
      case 2: {
        return [section1, section2]
      }
      case 3: {
        return [section1, section2, section3]
      }
      case 4: {
        return [section1, section2, section3, section4]
      }
      default: {
        return;
      }
    }
  }

  return (
    <>
      <nav className="topNav-container">
        <div className="container">
          {applySections()}
        </div>
      </nav>
    </>
  )
}
