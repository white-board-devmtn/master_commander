import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      return recent.map((assignment, index) => {
        return (
          <li key={index}>{assignment.name}</li>
        )
      })
    }
  }

  function showRecentPossible() {
    if (recent) {
      return recent.map((assignment, index) => {
        return (
          <li key={index + 100}>{assignment.outof}</li>
        )
      })
    }
  }

  function showRecentGrade() {
    if (recent) {
      return recent.map((assignment, index) => {
        return (
          <li key={index + 1000}>{assignment.grade}</li>
        )
      })
    }
  }

  return (
    <div className="home-box">
      <h1 className="title">Recently Graded Assignments</h1>
      {recent.length ? (
        <div className="recent">
          <ul>
            <h1>Assignment Name</h1>
            {showRecentName()}
          </ul>
            {props.user.isTeacher ? <></> : (
          <ul>
            <h1>Grade</h1>
            {showRecentGrade()}
          </ul>
            )}
          <ul>
            <h1>Points Possible</h1>
            {showRecentPossible()}
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

export default withRouter(RecentGraded);