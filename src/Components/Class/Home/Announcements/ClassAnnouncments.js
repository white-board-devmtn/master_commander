import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const ClassAnnouncements = (props) => {

  const classID = props.match.params.id;
  const [announcements, setAnnouncements] = useState('');

  useEffect(() => {
    return () => {
      return announcements
    };
  }, [announcements])

  useEffect(() => {
    axios.get(`/api/class/getAnnouncements?classid=${classID}`).then(res => {
      setAnnouncements(res.data);
    }).catch(() => console.log('could not get at this time'));
  }, []);

  function showAnnouncements() {
    if (announcements) {
      return announcements.map(announcement => {
        return (
          <div className="class-home-annoucnment">
          <h3>{announcement.name}</h3>
          <p>{announcement.details}</p>
          </div>
        )
      })
    }
  }
  
  return (
    <div className="class-home-info-box">
      <h1 className="class-home-box-title">Announcements</h1>
      <div>
        {showAnnouncements()}
      </div>
    </div>
  )
}

export default withRouter(ClassAnnouncements);