import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Redux/Ducks/userReducer'
import './Profile.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios';
import TopNav from '../shared/TopNav';
import ProfileCard from './ProfileCard/ProfileCard'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  
})


const Profile = (props) => {

  const [firstName, updateFirstName] = useState('')
  const [lastName, updateLastName] = useState('')
  const [img, updateImg] = useState('')
  const [password, updatePassword] = useState('')
  const [phoneNumber, updatePhoneNumber] = useState('')
  const [editToggle, updateEditToggle] = useState(true)



  useEffect(() => {
    props.getUser()
  }, [])

  async function handleUpdateUser() {
    const { id } = props.user
    const updateInfo = { firstName, lastName, phoneNumber, img }
    const res = await axios.put(`/api/profile/${id}`, updateInfo)
      .then(res => {
        props.getUser()
      })
  }

  // console.log(props.user.email)
  return (
    <>
      <NavBar />
      <div className="profileComponent">
        <TopNav
          number={1}
          name1={'Profile'}
        />
        <div className="profile-home-container">
          {editToggle ? (
            <div>
              <ProfileCard
                img={props.user.img}
                firstName={props.user.firstName}
                lastName={props.user.lastName}
                email={props.user.email}
                number={props.user.phoneNumber}
              />
                <button style={{ cursor: "pointer" }} onClick={() => updateEditToggle(false)}>Edit Profile</button>
              

            </div>
          ) : (
              <div>
                <input placeholder='First Name' value={firstName} onChange={e => updateFirstName(e.target.value)} />
                <input placeholder='Last Name' value={lastName} onChange={e => updateLastName(e.target.value)} />
                <input placeholder='Profile Image' value={img} onChange={e => updateImg(e.target.value)} />
                <input placeholder='Phone Number' value={phoneNumber} onChange={e => updatePhoneNumber(e.target.value)} />

                
                  <button style={{ cursor: "pointer" }} onClick={() => { updateEditToggle(true); handleUpdateUser() }}>Edit Profile</button>
                  <button style={{ cursor: "pointer" }} onClick={() => updateEditToggle(true)}>Cancel</button>
                
              </div>
            )}
      </div>
      </div>
    </>
  )
}

function mapStateToProps(reduxState) {
  // console.log(reduxState)
  return {
    user: reduxState.user
  }
};


export default connect(mapStateToProps, { getUser })(Profile)
