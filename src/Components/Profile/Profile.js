import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Redux/Ducks/userReducer'
import './Profile.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios';

import lake from '../../images/lake.jpg';

// import ProfileImage from './ProfileCard/ProfileImage'

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

  const [firstName, setFirstName] = useState(props.user.firstName)
  const [lastName, setLastName] = useState(props.user.lastName)
  const [email, setEmail] = useState(props.user.email)
  const [img, setImg] = useState(props.user.img)
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber)
  const [editToggle, setEditToggle] = useState(false)

  console.log(firstName)

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

  return (
    <div className='profile-component'>
      <NavBar />
      <div className='profile-component-container'>
        <div style={{backgroundImage: `url(${lake})`}} className='profile-header'>
          <div style={{backgroundImage: `url(${props.user.img})`}} className='profile-pic' />
        </div>
        <h1 className='user-name'>{props.user.firstName} {props.user.lastName}</h1>
        <div className='info-display-container'>
          <div className='info-containers'>
            <p className={editToggle ? 'edit-profile' : 'no-display'} onClick={() => setEditToggle(false)}>confirm</p>
            <p className={editToggle ? 'no-display' : 'edit-profile'} onClick={() => setEditToggle(true)}>edit profile</p>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{width: '50%'}}>First Name:</h3><input placeholder={props.user.firstName} value={firstName} onChange={e => setFirstName(e.target.value)}/></div>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{width: '50%'}}>Last Name:</h3><input placeholder={props.user.lastName} value={lastName} onChange={e => setLastName(e.target.value)}/></div>
            <div className={editToggle ? 'no-display' : 'user-info'}><h3 style={{width: '50%'}}>Full Name:</h3><p>{props.user.firstName} {props.user.lastName}</p></div>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{width: '50%'}}>Email Address:</h3><input placeholder={props.user.email} value={email} onChange={e => setEmail(e.target.value)}/></div>
            <div className={editToggle ? 'no-display' : 'user-info'}><h3 style={{width: '50%'}}>Email Address:</h3><p>{props.user.email}</p></div>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{width: '50%'}}>Phone Number:</h3><input placeholder={props.user.phoneNumber} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/></div>
            <div className={editToggle ? 'no-display' : 'user-info'}><h3 style={{width: '50%'}}>Phone Number:</h3><p>{props.user.phoneNumber}</p></div>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{width: '50%'}}>Profile Image:</h3><input placeholder={props.user.img} value={img} onChange={e => setImg(e.target.value)}/></div>
            <div className='user-info' style={{borderBottom: '1px solid rgba(128, 128, 128, 0.466)'}}><h3 style={{width: '50%'}}>Password:</h3><p>change password</p></div>
          </div>
          <hr/>
          <div className='info-containers'>
            
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user
  }
};


export default connect(mapStateToProps, { getUser })(withStyles(styles)(Profile));
