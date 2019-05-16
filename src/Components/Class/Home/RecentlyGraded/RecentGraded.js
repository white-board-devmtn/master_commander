import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const RecentGraded = (props) => {

  const classID = props.match.params.id;
  const [recent, setRecent] = useState('');

  useEffect(() => {
    return () => {
      return recent
    };
  }, [recent])

  useEffect(() => {
    if (props.user.id) {
      axios.get(`/api/class/recentlyGraded?id=${props.user.id}&classid=${classID}`).then((res) => {
        return setRecent(res.data)
      }).catch(() => console.log('could not get at this time'));
    }
  }, [props.user.id])

  function showRecentName() {
    if (recent) {
      return recent.map(assignment => {
        return (
          <>
            <li>{assignment.name}</li>
          </>
        )
      })
    }
  }

  function showRecentAverage() {
    if (recent) {
      return recent.map(assignment => {
        return (
          <>
            <li>{assignment.average}</li>
          </>
        )
      })
    }
  }

  function showRecentGrade() {
    if (recent) {
      return recent.map(assignment => {
        return (
          <>
            <li>{assignment.grade}</li>
          </>
        )
      })
    }
  }

  return (
    <div className="class-home-info-box">
      <h1 className="class-home-box-title">Recently Graded Assignments</h1>
      <div className="class-home-list-assignment-box">
        <ul>
          <h1>Assignment Name</h1>
          {showRecentName()}
        </ul>
        <ul>
          <h1>Class Average</h1>
          {showRecentAverage()}
        </ul>
        <ul>
          <h1>Grade</h1>
          {showRecentGrade()}
        </ul>
      </div>
    </div>
  )
}

export default withRouter(RecentGraded);