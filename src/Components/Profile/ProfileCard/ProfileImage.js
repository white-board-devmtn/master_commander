import React, { useState, useEffect } from 'react';

import './ProfileImage.css';

const ProfileImage = (props) => {

  const [edit, toggleEdit] = useState(false);

  useEffect(() => {
    return () => {
      return edit
    };
  }, [edit])

  return (
    <div className="profilecard-container">
      <div style={{backgroundImage: `url(${props.img})`}} className="profile-personal-image-box"></div>
    </div>
  )
}

export default ProfileImage;