import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';
import noImage from '../../images/no-image.png'
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
        <div>
          {
            props.user.img ? (
              <img src={props.user.img} alt="of person" className="navbar-profile-img" />
            ) : (
                <div className="navbar-option-container">
                  <i className="far fa-user navbar-font"></i>
                  <span>Account</span>
                </div>
              )
          }
        </div>
        <Link to="/profile"><i className="fas fa-id-card navbar-font"></i></Link>
        <Link to="/dashboard"><i className="fas fa-desktop navbar-font"></i></Link>
        <Link to="/calendar"><i className="fas fa-calendar-alt navbar-font"></i></Link>
        <a href="/"><i className="fas fa-power-off navbar-font" onClick={logout}></i></a>
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
