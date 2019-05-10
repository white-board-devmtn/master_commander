import React, {useState} from 'react';

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

export default Login