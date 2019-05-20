import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { CalculateAverage } from '../../../shared/MathCalculations';
import moment from 'moment'

const Students = (props) => {

  const classID = props.match.params.id;

  const [students, setStudents] = useState([]);

  useEffect(() => {
    return () => {
      return students
    }
  }, [students])

  useEffect(() => {

    axios.get(`/api/class/classStudents?id=${classID}`).then((res) => {
      return setStudents(res.data)
    }).catch(() => console.log('could not get at this time'))
  }, [])

  console.log(students)

  let mappedStudents = students.map(item => {
    for (let i = 0; i < item.duedate.length; i++) {
      let date = moment(new Date()).format('YYYY-DD-MM')
      let duedate = moment(item.duedate[i]).format('YYYY-DD-MM')
      if (duedate > date) {
        delete item.duedate[i]
        delete item.outof[i]
        delete item.points[i]
      }

    }
    console.log(item.outof, item.points)
    let grade = CalculateAverage(item.outof, item.points)
    console.log(grade)
    if(grade) {
      
      return <li>{item.firstname} {item.lastname} {grade[0]} {grade[1]}% </li>
    } 
    return <li>{item.firstname} {item.lastname}</li>
  })
  // console.log(mappedStudents)
  return (
    <div>
      <ul>
        {mappedStudents}
      </ul>
    </div>
  )

}

export default withRouter(Students);