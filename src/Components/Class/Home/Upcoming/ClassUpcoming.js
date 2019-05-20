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



  console.log(props)
  useEffect(() => {
    if (props.user.id) {
      axios.get(`/api/class/upcomingAssignments?id=${props.user.id}&classid=${classID}`).then((res) => {
        return setUpcoming(res.data)
      }).catch(() => console.log('could not get at this time'));
    }
  }, [props.user.id])

  function showUpcomingName() {
    if (upcoming) {
      return upcoming.map(assignment => {
        return (
          <>
            <p>{assignment.name}</p>
          </>
        )
      })
    }
  }

  function showUpcomingDate() {
    if (upcoming) {
      return upcoming.map(assignment => {
        assignment.duedate = moment(assignment.duedate).format('M-D-YYYY')
        return (
          <>
            <p>{assignment.duedate}</p>
          </>
        )
      })
    }
  }

  return (
    <div className="class-home-info-box">
      <h1 className="class-home-box-title">Upcoming Assignments</h1>
      <div className="class-home-list-assignment-box">
        {upcoming.length ? (
          <>
          <ul>
            <h1>Assignment Name</h1>
            {showUpcomingName()}
          </ul>
          <ul>
            <h1>Assignment Due Date</h1>
            {showUpcomingDate()}
          </ul>
          </>
      ) : (
            <div>
              <CircularProgress size={50} color="secondary" />
            </div>
          )}
      </div>
    </div>
  )
}

export default withRouter(ClassUpcoming);