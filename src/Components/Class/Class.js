import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import ClassHome from './Home/ClassHome';
import Forum from './Forum/Forum';
import Assignments from './Assignments/Assignments';
import Students from './Home/Students/Students'

import NavBar from '../NavBar/NavBar';
import TopNav from '../shared/TopNav';
import { getUser } from '../../Redux/Ducks/userReducer';
import axios from 'axios'

const Class = (props) => {

  
  const [displayComponent, setDisplay] = useState('Class Home')
  const [classDetails, updateClassDetails] = useState([])




  useEffect(() => {
    const { id } = props.match.params
    axios.get(`/api/class/classTitle?id=${id}`)
      .then(response => {                
        updateClassDetails(response.data[0])
        })
  }, [])

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
      case 'CLASS HOME': {
        return <ClassHome
          user={props.user}
        />
      }
      case 'ASSIGNMENTS': {
        return <Assignments
          user={props.user} />
      }
      case 'FORUM': {
        return <Forum
          id={props.user.id}
        />
      }
      case 'STUDENTS': {
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
                name1={'CLASS HOME'}
                name2={'ASSIGNMENTS'}
                name3={'FORUM'}
                name4={'STUDENTS'}
                setComponent={setDisplay}
                displayComponent={displayComponent}
                classList={classDetails}
              />
              {changeDisplay()}
            </div>
        ) : (

            <div className="class-container">
              <TopNav
                number={3}
                name1={'CLASS HOME'}
                name2={'ASSIGNMENTS'}
                name3={'FORUM'}
                setComponent={setDisplay}
                displayComponent={displayComponent}
                classList={classDetails}
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