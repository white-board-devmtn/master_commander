import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { CalculateAverage } from '../../shared/MathCalculations';

function ClassGrades(props) {

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    axios.get(`/api/profile/getGrades/${props.id}`)
      .then(res => {
      setGrades(res.data);
      })
      .catch(err => console.log(err));
  }, [grades])

  // useEffect(() => {
  //   return () => {
  //     return grades
  //   };
  // }, [grades])

  function showGrades() {
    if (grades) {
      return grades.map((theClass, i) => {
        const grade = CalculateAverage(theClass.pointspossible, theClass.pointsrecieved)
        return(
          <div key={theClass.name} className='user-info'>
            
            <h1>{theClass.name}</h1>
            <div style={{width: '7rem', display: 'flex', justifyContent: 'space-between'}}>
              <h2>{grade[0]}</h2>
              <h2>{grade[1]}%</h2>
            </div>
          </div>
        )
      })
    }
  }

  return (
    <div style={{marginTop: '1.3rem'}}>
      <div className='class-info-key'>
        <div style={{margin: '0rem 2rem', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <h2>Class</h2>
          <div style={{width: '7rem', display: 'flex', justifyContent: 'space-between'}}>
            <h2>Grade</h2>
            <h2>%</h2>
          </div>
        </div>
      </div>
      {showGrades()}
    </div>
  )
}

export default ClassGrades;