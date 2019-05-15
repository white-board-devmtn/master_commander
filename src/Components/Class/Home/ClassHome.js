import React, { useState } from 'react'
import axios from 'axios';

import './ClassHome.css';
import ClassAnnouncments from './Announcments/ClassAnnouncments';
import RecentGraded from './RecentlyGraded/RecentGraded';
import ClassUpcoming from './Upcoming/ClassUpcoming';
import ClassSyllabus from './Syllabus/ClassSyllabus';

const ClassHome = (props) => {
  return (
    <div className="class-information-container">
      <ClassAnnouncments />
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