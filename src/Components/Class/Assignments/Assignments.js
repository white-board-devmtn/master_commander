import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import Assignment from '../Assignments/Assignment/Assignment'
import AddAssignment from './AddAssignment'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { CalculateAverage } from '../../shared/MathCalculations';


import './Assignments.scss';



const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});



const Assignments = (props) => {


  const classID = props.match.params.id;
  const [assignments, setAssignments] = useState([]);
  const [adding, toggleAdd] = useState(false);
  const [points, setPoints] = useState([]);
  const [grade, setGrade] = useState([]);
  const { classes } = props;


  useEffect(() => {
    return () => {
      return assignments
    };
  }, [assignments])

  // console.log(props.user.id)
// console.log(assignments)
// console.log(props)
  useEffect(() => {
    if (props.user.id) {
      console.log(props.user.id, classID);
      axios.get(`/api/class/classAssignments?id=${props.user.id}&classid=${classID}`).then((res) => {
        console.log(res);
        setAssignments(res.data);
        getPoints(res.data);
        return;
      }).catch((err) => console.log('could not get at this time', err));
    }
  }, [props.id])
  console.log(assignments);

  useEffect(() => {
    return () => {
      return points
    };
  }, [points])

  useEffect(() => {
    return () => {
      return grade
    };
  }, [grade])

  function getPoints(allAssignments) {
    let pointsArr = [];
    let outOfArr = [];
    for (let i in allAssignments) {
      if (allAssignments[i].complete) {
        let points = Number(allAssignments[i].points)
        pointsArr.push(points)
        outOfArr.push(allAssignments[i].outof)
      }
    }
    if (pointsArr.length || outOfArr.length) {
      let totalPoints = pointsArr.reduce((sum, acc) => sum += acc)
      let totalPossible = outOfArr.reduce((sum, acc) => sum += acc)
      setPoints([[totalPossible], [totalPoints]])
      setGrade(CalculateAverage([totalPossible], [totalPoints]));
      return;
    } else {
      return;
    }
  }


  function display() {
    if (assignments.length) {
      return (
        <div className="assignment-home">
          {props.user.isTeacher ? (
            <>
              <Button onClick={() => toggleAdd(!adding)}>Add Assignment</Button>
              <AddAssignment
                adding={adding}
                toggleAdd={toggleAdd}
                user={props.user}
                classid={classID} />
            </>) : (<></>)}
          <div className="container">
            <div className="key">
              <h1>Assignment Name</h1>
              <h2>Grade</h2>
              <h2>Possible</h2>
            </div>
            {assignments.map(item => {
              return <Assignment key={item.id}
                assignment={item}
              />
            })}
            <div className="grade-box">
              <div className="grade">
                <p>{points[1]} / {points[0]}</p>
                <p>Grade: {grade.length ? <>{grade[0]} {grade[1]}</> : <></>}</p>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ marginLeft: '100px', minHeight: '100vh' }}>
          <CircularProgress className={classes.progress} size={50} color="secondary" />
        </div>
      )
    }
  }
  return (
    display()
  )
}

export default withRouter(withStyles(styles)(Assignments));