import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import Assignment from '../../Assignment/Assignment'
import AddAssignment from './AddAssignment'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


import './Assignments.css';



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
      return(
        props.user.isTeacher ? (
          <div style={{ marginLeft: '100px', minHeight: '100vh' }}>
            <button onClick={() => toggleAdd(true)}>New Assignment</button>
            <AddAssignment
              adding={adding}
              toggleAdd={toggleAdd}
              user={props.user}
              classid={classID} />
            <div>
              {assignments.map(item => {
                return <Assignment key={item.id}
                  assignment={item}
                />
              })}
            </div>
          </div>
        ) : (
            <div style={{ marginLeft: '100px', minHeight: '100vh' }}>
              <div>
                {assignments.map(item => {
                  return <Assignment key={item.id}
                    assignment={item}
                  />
                })}
              </div>
            </div>
          )
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