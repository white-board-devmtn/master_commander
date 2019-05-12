import React, {useState} from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../../Redux/Ducks/userReducer';


function Login() {
    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: ''
    })



function handleLogin() {

}



    return (
        <div>
            <div>
                <p>Login</p>
                <input placeholder='Email'/>
                <input placeholder='Password'/>
                <button> Login </button>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        user: reduxState
    }
};


export default connect(mapStateToProps, {loginUser})(Login)
