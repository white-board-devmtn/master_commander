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

  useEffect(() => {
    if (props.user.id) {
      axios.get(`/api/class/classAssignments?id=${props.user.id}&classid=${classID}`).then((res) => {
        setAssignments(res.data);
        getPoints(res.data);
        return;
      }).catch((err) => console.log('could not get at this time', err));
    }
  }, [props.id])

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
              <div className='container'>
                <AddAssignment
                  adding={adding}
                  toggleAdd={toggleAdd}
                  user={props.user}
                  classid={classID}
                  setAssignments={setAssignments}
                  id={props.user.id} />
                <div className="key">
                  <div style={{width: '95%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Assignment Name</h1>
                    <Button className='add-assignment' onClick={() => toggleAdd(!adding)}>Add Assignment</Button>
                    <h2>Info</h2>
                  </div>
                </div>
                {assignments.map(item => {
                  return <Assignment key={item.ass_id}
                    assignment={item}
                  />
                })}
              </div>
            </>) : (
          <div className="container">
            <div className="key">
              <div style={{width: '95%', display: 'flex', justifyContent: 'space-between'}}>
                <h1>Assignment Name</h1>
                <div style={{width: '6.5rem', display: 'flex', justifyContent: 'space-between'}}>
                  <h2>Grade</h2>
                  <h2>Total</h2>
                </div>
              </div>
            </div>
            {assignments.map(item => {
              return <Assignment key={item.id}
                assignment={item}
              />
            })}
            <div className="grade-box">
              <div className="grade">
                <p style={{marginRight:'22.5rem'}} >TOTALS:</p>
                <p style={{marginRight:'4rem'}}>Grade: {grade.length ? <>{grade[0]} ({grade[1]}%)</> : <></>}</p>
                <div style={{width: '6.5rem', display: 'flex', justifyContent : 'space-between'}}>
                  <div style={{width: '3.25rem', display: 'flex', justifyContent : 'space-between'}}>
                    <p style={{width: '3.25rem', display: 'flex', justifyContent : 'space-between'}}>{points[1]}</p>
                    <p>/</p> 
                  </div>                    
                  <p>{points[0]}</p>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      )
    } else {
      return (
        <div style={{ marginLeft: '100px', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CircularProgress size={50} color="secondary"/>
        </div>
      )
    }
  }
  return (
    display()
  )
}

export default withRouter(Assignments);