import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';

import { logOutUser, getUser } from '../../Redux/Ducks/userReducer'


const NavBar = (props) => {
  async function logout() {
    await props.logOutUser();
    window.location.reload();
  }
  

  useEffect(() => {
    getUser()
  }, [])


  return (
    <div className="navbar-container">
      <div className="navbar-option-container">
        <Link to="/profile">
          {
            props.user.img ? (
              <div style={{backgroundImage: `url(${props.user.img})`}} alt="Profile Picture" className="navbar-profile-img tooltip">
                <span className='tooltiptext' style={{left: '7rem'}}>account</span>
              </div>
            ) : (
                <div className="navbar-option-container">
                  <i className="far fa-user navbar-font tooltip"></i>
                  <span>Account</span>
                  <span className='tooltiptext'>account</span>
                </div>
              )
          }
        </Link>
        <Link to="/dashboard"><i className="fas fa-desktop navbar-font tooltip"><span className='tooltiptext'>dashboard</span></i></Link>
        <Link to="/calendar"><i className="fas fa-calendar-alt navbar-font tooltip"><span className='tooltiptext'>calendar</span></i></Link>
        <a href="/"><i className="fas fa-power-off navbar-font tooltip" onClick={logout}><span className='tooltiptext'>logout</span></i></a>
      </div>
    </div>
  )
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user
  }
}

export default connect(mapStateToProps, { logOutUser })(NavBar);
