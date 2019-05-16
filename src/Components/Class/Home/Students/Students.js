import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';

const Students = (props) => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    return () => {
      return students
    }
  }, [students])

  return (
  <div>
    
  </div>
)

}

export default withRouter(Students);