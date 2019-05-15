import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';

import ClassHome from './Home/ClassHome';
import NavBar from '../NavBar/NavBar';
import TopNav from '../shared/TopNav';
import {getUser} from '../../Redux/Ducks/userReducer';

const Class = (props) => {

  const [displayComponent, setDisplay] = useState('Class Home')

  useEffect(() => {
    props.getUser();
  }, [])
  
  useEffect(() => {
    return () => {
      return displayComponent
    };
  }, [displayComponent])

  function changeDisplay() {
    switch (displayComponent) {
      case 'Class Home': {
        return <ClassHome
          id={props.user.id}
        />
      }
      case 'Assignments': {
        return
      }
      case 'Forum': {
        return
      }
      default: {
        return <ClassHome
          id={props.user.id}
        />
      }
    }
  }
  return (
    <div className="class-parent-container">
      <NavBar />
      <div className="class-container">
        <TopNav
          number={3}
          name1={'Class Home'}
          name2={'Assignments'}
          name3={'Forum'}
          setComponent={setDisplay}
          displayComponent={displayComponent}
        />
        {changeDisplay()}
      </div>
    </div>
  )
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user
  }
}

export default connect(mapStateToProps, {getUser})(Class);