import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';
import CalendarToday  from '@material-ui/icons/CalendarToday';
import PermIdentity from '@material-ui/icons/PermIdentity';
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
              <div className="Navbar-icon-container">
                {/* <figure className="Navbar-profile-image-figure"> */}
                  <img src={props.user.img} alt="Profile Picture" className="navbar-profile-img tooltip" />
                {/* </figure> */}
                <h2 className='tooltiptext'>Account</h2>
              </div>
            ) : (
                <div className="Navbar-icon-container">
                  <CalendarToday size="2x" className="navbar-font tooltip"/>
                  <h2>Account</h2>
                </div>
              )
          }
        </Link>
        <Link to="/dashboard"><div className="Navbar-icon-container"><CalendarToday className="navbar-font tooltip"/><h2 className="tooltiptext">Dashboard</h2></div></Link>
        <Link to="/calendar"><div className="Navbar-icon-container"><CalendarToday className="navbar-font tooltip"/><h2 className='tooltiptext'>Calendar</h2></div></Link>
        <a href="/"><div className="Navbar-icon-container"><PermIdentity size="2x"className="navbar-font tooltip"/><h2 className='tooltiptext'>Logout</h2></div></a>
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
