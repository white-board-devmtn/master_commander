import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import Assignment from '../../Assignment/Assignment'


import './Assignments.css';

const Assignments = (props) => {


  const classID = props.match.params.id;
  const [assignments, setAssignments] = useState([]);
  const [edit, setEdit] = useState(false);

  
  useEffect(() => {
    return () => {
      return assignments
    };
  }, [assignments])
  
  // console.log(assignments)

  useEffect(() => {
    if (props.id) {
      axios.get(`/api/class/classAssignments?id=${props.id}&classid=${classID}`).then((res) => {
        return setAssignments(res.data)
      }).catch(() => console.log('could not get at this time'));
    }
  }, [props.id])



  
  
  
  return (
    <div style={{ marginLeft: '100px' }}>     
      <div>
      {assignments.map(item => {
        return <Assignment key={item.id} 
        assignment={item}
        assignments={assignments}
        />
        })}
      </div>
    </div>
  )
}

export default withRouter(Assignments);