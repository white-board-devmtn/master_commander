import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';

import ClassHome from './Home/ClassHome';
import Forum from './Forum/Forum';
import Assignments from './Assignments/Assignments';
import Students from './Home/Students/Students'

import NavBar from '../NavBar/NavBar';
import TopNav from '../shared/TopNav';
import { getUser } from '../../Redux/Ducks/userReducer';

const Class = (props) => {

  const [displayComponent, setDisplay] = useState('Class Home')

  useEffect(() => {
    props.getUser().then().catch(err => props.history.push('/'))
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
          user={props.user}
        />
      }
      case 'Assignments': {
        return <Assignments
          user={props.user} />
      }
      case 'Forum': {
        return <Forum
          id={props.user.id}
        />
      }
      case 'Students': {
        return <Students
          user={props.user} />
      }
      default: {
        return <ClassHome
          user={props.user}
        />
      }
    }
  }
  return (
    <div className="class-parent-container" style={{background: 'rgb(236, 236, 236)', width: '100%'}}>
      <NavBar />
      {
        props.user.isTeacher ? (
          <div className="class-container">
              <TopNav
                number={4}
                name1={'Class Home'}
                name2={'Assignments'}
                name3={'Forum'}
                name4={'Students'}
                setComponent={setDisplay}
                displayComponent={displayComponent}
              />
              {changeDisplay()}
            </div>
        ) : (

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
          )
      }
    </div>
  )
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user
  }
}

export default connect(mapStateToProps, { getUser })(Class);