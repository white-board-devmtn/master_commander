import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';


const ClassUpcoming = (props) => {

  const classID = props.match.params.id;
  const [upcoming, setUpcoming] = useState('');

  useEffect(() => {
    return () => {
      return upcoming
    };
  }, [upcoming])

  useEffect(() => {
    if (props.user.id) {
      axios.get(`/api/class/upcomingAssignments?id=${props.user.id}&classid=${classID}`).then((res) => {
        return setUpcoming(res.data)
      }).catch(() => console.log('could not get at this time'));
    }
  }, [props.user.id])

  function showUpcomingName() {
    if (upcoming) {
      return upcoming.map((assignment, index) => {
        return <p key={index}>{assignment.name}</p>
      })
    }
  }

  function showUpcomingDate() {
    if (upcoming) {
      return upcoming.map((assignment, index) => {
        assignment.duedate = moment(assignment.duedate).format('M-D-YYYY')
        return <p key={index}>{assignment.duedate}</p>
      })
    }
  }

  return (
    <div className="home-box">
      <h1 className="title">Upcoming Assignments</h1>
      {upcoming.length ? (
        <div className="assignment-box">
          <ul>
            <h1>Assignment Name</h1>
            {showUpcomingName()}
          </ul>
          <ul>
            <h1>Assignment Due Date</h1>
            {showUpcomingDate()}
          </ul>
        </div>
      ) : (
          <div className="loading-box">
            <CircularProgress size={50} color="secondary" />
          </div>
        )}
    </div>
  )
}

export default withRouter(ClassUpcoming);