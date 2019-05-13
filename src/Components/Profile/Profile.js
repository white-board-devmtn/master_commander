import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Redux/Ducks/userReducer'

function Profile(props) {
    const [userProfile, setUserProfile] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        profilePic: '',
        phoneNumber: '',
    })

    useEffect(() => {
        getUser()
    }, [])
    console.log(props)

    return (
        <div>
            Profile

        </div>
    )
}

function mapStateToProps(reduxState) {
    console.log(reduxState)
    return {
        user: reduxState
    }
};


export default connect(mapStateToProps, { getUser })(Profile)
