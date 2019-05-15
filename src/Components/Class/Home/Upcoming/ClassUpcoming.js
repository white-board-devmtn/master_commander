import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const ClassUpcoming = (props) => {

  const classID = props.match.params.id;
  const [upcoming, setUpcoming] = useState('');

  useEffect(() => {
    return () => {
      return upcoming
    };
  }, [upcoming])

  useEffect(() => {
    if (props.id) {
      axios.get(`/api/class/upcomingAssignments?id=${props.id}&classid=${classID}`).then((res) => {
        return setUpcoming(res.data)
      }).catch(() => console.log('could not get at this time'));
    }
  }, [props.id])

  function showUpcomingName() {
    if (upcoming) {
      return upcoming.map(assignment => {
        return (
          <>
            <li>{assignment.name}</li>
          </>
        )
      })
    }
  }

  function showUpcomingDate() {
    if (upcoming) {
      return upcoming.map(assignment => {
        return (
          <>
            <li>{assignment.duedate}</li>
          </>
        )
      })
    }
  }

  return (
    <div className="class-home-info-box">
      <h1 className="class-home-box-title">Upcoming Assignments</h1>
      <div className="class-home-list-assignment-box">
        <ul>
          <h1>Assignment Name</h1>
          {showUpcomingName()}
        </ul>
        <ul>
          <h1>Assignment Due Date</h1>
          {showUpcomingDate()}
        </ul>
      </div>
    </div>
  )
}

export default withRouter(ClassUpcoming);