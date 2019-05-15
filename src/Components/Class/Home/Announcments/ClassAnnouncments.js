import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const ClassAnnouncments = (props) => {

  const classID = props.match.params.id;
  const [announcments, setAnnouncments] = useState('');

  useEffect(() => {
    return () => {
      return announcments
    };
  }, [announcments])

  useEffect(() => {
    axios.get(`/api/class/getAnnouncments?classid=${classID}`).then(res => {
      setAnnouncments(res.data);
    }).catch(() => console.log('could not get at this time'));
  }, []);

  function showAnnouncments() {
    if (announcments) {
      return announcments.map(announcment => {
        return (
          <div className="class-home-annoucnment">
          <h3>{announcment.name}</h3>
          <p>{announcment.details}</p>
          </div>
        )
      })
    }
  }
  
  return (
    <div className="class-home-info-box">
      <h1 className="class-home-box-title">Announcements</h1>
      <div>
        {showAnnouncments()}
      </div>
    </div>
  )
}

export default withRouter(ClassAnnouncments);