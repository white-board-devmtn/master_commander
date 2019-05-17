import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ClassGrades = (props) => {

  const [grades, setGrades] = useState([]);
  const [classGrades, setClassGrade] = useState([]);
  console.log(props.id);
  useEffect(() => {
    axios.get(`/api/profile/getGrades?id=${props.id}`).then(res => {
      console.log(res);
      setGrades(res.data)
    })
  }, [])

  useEffect(() => {
    return () => {
      return grades
    };
  }, [grades])
  console.log(grades);

  return (
    <div student-info-box>
      <h1>Hello</h1>
    </div>
  )
}

export default ClassGrades;