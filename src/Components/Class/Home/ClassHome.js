import React, { useState } from 'react'
import axios from 'axios';

import './ClassHome.scss';
import ClassAnnouncements from './Announcements/ClassAnnouncments';
import RecentGraded from './RecentlyGraded/RecentGraded';
import ClassUpcoming from './Upcoming/ClassUpcoming';
import ClassSyllabus from './Syllabus/ClassSyllabus';


const ClassHome = (props) => {
  console.log(props)
  return (
    <div className="class-information-container">
      <ClassAnnouncements 
      user={props.user}/>
      <ClassUpcoming
        user={props.user}
      />
      <ClassSyllabus />
      <RecentGraded
        user={props.user}
      />
    </div>
  )
}

export default ClassHome;