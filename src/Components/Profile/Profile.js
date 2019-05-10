import React, {useState} from 'react'


const Profile = (props) => {
    const [myProfile, setMyProfile] = useState({
        name: 'Tanner',
        email: 'tanner@scaddenfamily.com',
        phone: 3852313361
    })

    return(
        <>
            <h1>{myProfile.name}</h1>
            <h3>{myProfile.email}</h3>
            <h3>{myProfile.phone}</h3>
        </>
    )
}


export default Profile;