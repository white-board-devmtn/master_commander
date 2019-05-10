import React, {useState} from 'react';

function Profile () {
    const [userProfile, setUserProfile] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        profilePic: '',
        phoneNumber: '',
    })

    return (
        <div>
            Profile
        </div>
    )
}