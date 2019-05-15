import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../../Redux/Ducks/userReducer'
import NavBar from '../NavBar/NavBar'


const Assignment = (props) => {



  useEffect(() => {
    props.getUser()
  }, [])

  return (
    <>
      <NavBar />
      <div>

      </div>
    </>
  )
}

export default connect(mapStateToProps, { getUser })(Assignment)