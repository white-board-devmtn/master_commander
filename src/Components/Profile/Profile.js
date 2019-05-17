import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Redux/Ducks/userReducer'
import './Profile.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';

import ProfileImage from './ProfileCard/ProfileImage'
import StudentInfo from './StudentInfo/StudentInfo';
import ClassGrades from './ClassGrades/ClassGrades';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    minHeight: '30em',
    backgroundColor: 'red'
  },
  listItem: {
    height: '8em'
  }
});


const Profile = (props) => {

  const { classes } = props;

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
    axios.put(`/api/profile/${id}`, updateInfo).then(() => {
      props.getUser().then().catch(err => console.log(err));
    }).catch(err => console.log(err));
  };

  console.log(props);
  return (
    <>
      <NavBar />
      <div className="profileComponent">
        <div className="profile-home-container">
          {editToggle ? (
            <div>
              <ProfileImage
                img={props.user.img}
              />
              <div className="profile-info-container">
                <div className="profile-student-info">
                  <h1>Your Information</h1>
                  {/* <button style={{ cursor: "pointer" }} onClick={() => updateEditToggle(false)}>Edit Profile</button> */}
                  <StudentInfo 
                    email={props.user.email}
                    firstName={props.user.firstName}
                    lastName={props.user.lastName}
                    number={props.user.phoneNumber}
                  />
                  
                </div>

                <div className="profile-student-info">
                  <h1>Class Grades</h1>
                  <ClassGrades 
                    id={props.user.id}
                  />
                </div>

              </div>


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
  return {
    user: reduxState.user
  }
};


export default connect(mapStateToProps, { getUser })(withStyles(styles)(Profile));
