import React, {useState} from 'react';
import {connect} from 'react-redux';
import {loginUser, getUser} from '../../Redux/Ducks/userReducer';
import axios from 'axios';
import './Login.css'
import wbLogo3 from '../../images/wbLogo3.png'
import markerBG from '../../images/markerBG.jpg'
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
    
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    
    
  });
  

  

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
        <div className="login-page" style={{backgroundImage: `url(${markerBG})`}}>
            <div className="login-register-container"> 
                <div className="login-container">
                    <img src={wbLogo3} style={{height:80, marginBottom:25}} />

                    <TextField className="loginInput"
                    id="outlined-with-placeholder"
                    label="Email Address"
                    // placeholder="Email Address"
                    value={email}
                    onChange={e => updateEmail(e.target.value)}
                    margin="normal"
                    variant="outlined" 
                    
                    >
                    </TextField>

                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    value={password} 
                    onChange={e => updatePassword(e.target.value)}
                    variant="outlined">
                    </TextField>
                    <button onClick={handleLogin}> Login </button>
                    {/* <p style={{cursor:"pointer"}} onClick={() => updateLoginToggle(false)}> need to register?</p> */}
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


export default connect(mapStateToProps, {loginUser, getUser})(Login)
