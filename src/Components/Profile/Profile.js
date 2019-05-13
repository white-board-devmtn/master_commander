import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Redux/Ducks/userReducer'
import './Profile.css'
import NavBar from '../NavBar/NavBar'

const Profile = (props) => {
  const [userProfile, setUserProfile] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    profilePic: '',
    phoneNumber: '',
  })

  const [editToggle, updateEditToggle] = useState(true)

  useEffect(() => {
    props.getUser()
  }, [])

  console.log(props.user)
  return (
    <>
      <NavBar />
      <div className="profileComponent">
        {editToggle ? (
          <div>
            <img src={props.user.img}></img>
            <p>{props.user.firstName} {props.user.lastName}</p>
            <p>{props.user.email}</p>
            <p>{props.user.phoneNumber}</p>
            <button style={{ cursor: "pointer" }} onClick={() => updateEditToggle(false)}>Edit Profile</button>

          </div>
        ) : (
            <div>

            </div>
          )}
      </div>
    </>
  )
}

function mapStateToProps(reduxState) {
  console.log(reduxState)
  return {
    user: reduxState.user
  }
};


export default connect(mapStateToProps, { getUser })(Profile)
