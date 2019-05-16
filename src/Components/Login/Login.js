import React, {useState} from 'react';
import {connect} from 'react-redux';
import {loginUser, getUser} from '../../Redux/Ducks/userReducer';
import axios from 'axios';
import './Login.css'
import louis from '../../images/thisIsLouis.jpg'


const Login = (props) => {

    const [email, updateEmail] = useState('')
    const [password, updatePassword] = useState('')
    const [firstName, updateFirstName] = useState('')
    const [lastName, updateLastName] = useState('')
    const [loginToggle, updateLoginToggle] = useState(true)


async function handleLogin() {
    const loginInfo = {email, password}
    const user = await props.loginUser(loginInfo)
    if (user.value.loggedIn) props.history.push('/dashboard');
}

 async function handleRegister() {
    const registerInfo = {firstName, lastName, email, password}
    const res = await axios.post('/Register', registerInfo)
    if (res.data.loggedIn) {
        console.log(res.data)
        // props.history.push('/dashboard')
    }
}

    return (
        <div className="login-page" style={{backgroundImage: `url(${louis})`}}>
            <div className="login-register-container"> 
                { loginToggle ?(  
                <div className="login-container">
                    <h2>Login</h2>
                    <input placeholder='Email' value={email} onChange={e => updateEmail(e.target.value)} />
                    <input placeholder='Password' value={password} onChange={e => updatePassword(e.target.value)} />
                    <button onClick={handleLogin}> Login </button>
                    <p style={{cursor:"pointer"}} onClick={() => updateLoginToggle(false)}> need to register?</p>
                </div>
                ):(
                <div className="register-container">
                    <h2>Register</h2>
                    <input placeholder='First Name' value={firstName} onChange={e => updateFirstName(e.target.value)} />
                    <input placeholder='Last Name' value={lastName} onChange={e => updateLastName(e.target.value)} />
                    <input placeholder='Email' value={email} onChange={e => updateEmail(e.target.value)} />
                    <input placeholder='Password' value={password} onChange={e => updatePassword(e.target.value)} />
                    <button onClick={handleRegister}> Register </button>
                    <p style={{cursor:"pointer"}} onClick={() => updateLoginToggle(true)}> already have login?</p>
                </div>
                )}
            </div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
    }
};


export default connect(mapStateToProps, {loginUser, getUser})(Login)
