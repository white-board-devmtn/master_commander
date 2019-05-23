import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Redux/Ducks/userReducer'
import './Profile.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios';

import lake from '../../images/lake.jpg';

// import ProfileImage from './ProfileCard/ProfileImage'

import ClassGrades from './ClassGrades/ClassGrades';
import UploadFile from '../shared/UploadFile';
import Alert from 'react-s-alert';


const Profile = (props) => {


  const [firstName, setFirstName] = useState(props.user.firstName)
  const [lastName, setLastName] = useState(props.user.lastName)
  const [email, setEmail] = useState(props.user.email)
  const [img, setImg] = useState(props.user.img)
  const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber)
  const [editToggle, setEditToggle] = useState(false)

  useEffect(() => {
    props.getUser()
  }, [])

  async function handleUpdateUser() {
    const { id } = props.user
    const updateInfo = { firstName, lastName, email, phoneNumber, img }
    await axios.put(`/api/profile/${id}`, updateInfo).then(() => {
      props.getUser()
      Alert.success(`Updated your information`, {
        position: 'top-right',
        effect: 'genie',
        beep: false,
        timeout: 2000,
        offset: 100
      });
    })
      .catch(err => console.log(err));
    setImg(props.user.img)
    setEditToggle(false)
  };

  function cancel() {
    setEditToggle(false)
    setFirstName(props.user.firstName)
    setLastName(props.user.lastName)
    setEmail(props.user.email)
    setImg(props.user.img)
    setPhoneNumber(props.user.phoneNumber)
  }

  return (
    <div className='profile-component'>
      <NavBar />
      <div className='profile-component-container'>
        <div style={{ backgroundImage: `url(${lake})` }} className='profile-header'>
          <div style={{ backgroundImage: `url(${props.user.img})` }} className='profile-pic' />
        </div>
        <h1 className='user-name'>{props.user.firstName} {props.user.lastName}</h1>
        <div className='info-display-container'>
          <div className='user-info-container'>
            <p className={editToggle ? 'cancel-edit-profile' : 'no-display'} onClick={() => cancel()}>cancel</p>
            <p className={editToggle ? 'edit-profile' : 'no-display'} onClick={() => handleUpdateUser()}>confirm</p>
            <p className={editToggle ? 'no-display' : 'edit-profile'} onClick={() => setEditToggle(true)}>edit profile</p>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{ width: '50%' }}>First Name:</h3><input style={{ width: '50%' }} placeholder={props.user.firstName} value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{ width: '50%' }}>Last Name:</h3><input style={{ width: '50%' }} placeholder={props.user.lastName} value={lastName} onChange={e => setLastName(e.target.value)} /></div>
            <div className={editToggle ? 'no-display' : 'user-info'}><h3 style={{ width: '50%' }}>Full Name:</h3><p style={{ width: '50%' }}>{props.user.firstName} {props.user.lastName}</p></div>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{ width: '50%' }}>Email Address:</h3><input style={{ width: '50%' }} placeholder={props.user.email} value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div className={editToggle ? 'no-display' : 'user-info'}><h3 style={{ width: '50%' }}>Email Address:</h3><p style={{ width: '50%' }}>{props.user.email}</p></div>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{ width: '50%' }}>Phone Number:</h3><input style={{ width: '50%' }} type='number' placeholder={props.user.phoneNumber} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} /></div>
            <div className={editToggle ? 'no-display' : 'user-info'}><h3 style={{ width: '50%' }}>Phone Number:</h3><p style={{ width: '50%' }}>{props.user.phoneNumber}</p></div>
            <div className={editToggle ? 'user-info' : 'no-display'}><h3 style={{ width: '50%' }}>Profile Image:</h3><UploadFile setFile={setImg} /></div>
            <div className='user-info' style={{ borderBottom: '1px solid rgba(128, 128, 128, 0.466)' }}><h3 style={{ width: '50%' }}>Password:</h3><p style={{ width: '50%' }}>change password</p></div>
          </div>
          <hr />
          <div className='class-info-container'>
            <ClassGrades
              id={props.user.id}
            />
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


export default connect(mapStateToProps, { getUser })(Profile);
