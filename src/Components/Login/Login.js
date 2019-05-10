import React, {useState} from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../../Redux/Ducks/userReducer';

function Login() {
    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: ''
    })

    return (
        <div>
            Login Page
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        user: reduxState
    }
};


export default connect(mapStateToProps, {loginUser})(Login)