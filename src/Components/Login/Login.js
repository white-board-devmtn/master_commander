import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser, getUser } from '../../Redux/Ducks/userReducer';
import './Login.css'
import wbLogo3 from '../../images/wbLogo3.png'
import markerBG from '../../images/markerBG.jpg'
import TextField from '@material-ui/core/TextField';
import Alert from 'react-s-alert';

const Login = (props) => {

    const [email, updateEmail] = useState('')
    const [password, updatePassword] = useState('')

    useEffect(() => {
        return () => {
            return props
        };
    }, [props])

    function errorLogin() {
        Alert.error('Error logging in. Please check your login information', {
            position: 'top-right',
            effect: 'genie',
            beep: false,
            timeout: 2000,
            offset: 100
        });
    }

    async function handleLogin() {
        const loginInfo = { email, password }
        props.loginUser(loginInfo).then(res => {
            props.history.push('/dashboard');
            Alert.success(`Welcome ${res.value.userData.firstName} ${res.value.userData.lastName}`, {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });
        }).catch(() => {
            errorLogin()
        })
    }

    return (
        <div className="login-page" style={{ backgroundImage: `url(${markerBG})` }}>
            <div className="login-register-container">
                <div className="login-container">
                    <img src={wbLogo3} style={{ height: 80, marginBottom: 25 }} />

                    <TextField className="loginInput"
                        id="outlined-with-placeholder"
                        label="Email Address"
                        // placeholder="Email Address"
                        value={email}
                        onChange={e => updateEmail(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required

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
                        variant="outlined"
                        required
                    />
                    <button onClick={handleLogin}> Login </button>
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


export default connect(mapStateToProps, { loginUser, getUser })(Login)
