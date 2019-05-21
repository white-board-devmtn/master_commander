import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import Assignment from './Assignment/Assignment'
import AddAssignment from './AddAssignment'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';


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
  const { classes } = props;


  useEffect(() => {
    return () => {
      return assignments
    };
  }, [assignments])

  // console.log(props.user.id)

  useEffect(() => {
    if (props.user.id) {
      axios.get(`/api/class/classAssignments?id=${props.user.id}&classid=${classID}`).then((res) => {
        return setAssignments(res.data)
      }).catch(() => console.log('could not get at this time'));
    }
  }, [props.id])

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
                <p>200 / 500</p>
                <p>Grade: 100% A</p>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
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