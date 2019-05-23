import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';
import CalendarToday  from '@material-ui/icons/CalendarToday';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Dashboard from '@material-ui/icons/Dashboard';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import wb from '../../images/wb.png'

import { logOutUser, getUser } from '../../Redux/Ducks/userReducer'

const NavBar = (props) => {

  async function logout() {
    props.logOutUser();
    props.history.push('/');
  }
  

  useEffect(() => {
    getUser()
  }, [])


  return (
    <div className="navbar-container">
      <div className='navbar-float'>
        <div className="wb">
          <img src={wb}/>
        </div>
        <div className="navbar-option-container">
          <Link to="/profile">
            {
              props.user.img ? (
                <div className="Navbar-icon-container">
                  {/* <figure className="Navbar-profile-image-figure"> */}
                    <div style={{backgroundImage: `url(${props.user.img}`}} alt="Profile Picture" className="navbar-profile-img tooltip" />
                  {/* </figure> */}
                  <h2 className='tooltiptext'>Account</h2>
                </div>
                ) : (
                <div className="Navbar-icon-container">
                  <PermIdentity className="navbar-font"/>
                  <h2>Account</h2>
                </div>
              )
            }
          </Link>
          <Link to="/dashboard"><div className="Navbar-icon-container"><Dashboard className="navbar-font"/><h2 className="tooltiptext">Dashboard</h2></div></Link>
          <Link to="/calendar"><div className="Navbar-icon-container"><CalendarToday className="navbar-font"/><h2 className='tooltiptext'>Calendar</h2></div></Link>
          <div className="Navbar-icon-container" onClick={logout}><PowerSettingsNew className="navbar-font"/><h2 className='tooltiptext'>Logout</h2></div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user
  }
}

export default connect(mapStateToProps, { logOutUser })(withRouter(NavBar));
