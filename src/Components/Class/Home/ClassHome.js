import React, { useState } from 'react'
import axios from 'axios';

import './ClassHome.css';
import ClassAnnouncements from './Announcements/ClassAnnouncments';
import RecentGraded from './RecentlyGraded/RecentGraded';
import ClassUpcoming from './Upcoming/ClassUpcoming';
import ClassSyllabus from './Syllabus/ClassSyllabus';

const ClassHome = (props) => {
  return (
    <div className="class-information-container">
      <ClassAnnouncements />
      <ClassUpcoming
        id={props.id}
      />
      <ClassSyllabus />
      <RecentGraded
        id={props.id}
      />
    </div>
  )
}

export default ClassHome;