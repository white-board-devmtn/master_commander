import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from '../../../NavBar/NavBar'
import Students from '../Students/Students';
import Popup from 'reactjs-popup'

const Student = (props) => {

  const [assignments, setAssignments] = useState([]);
  const [grade, setGrade] = useState(false)


  useEffect(() => {
    return () => {
      return assignments
    };
  }, [assignments])



  useEffect(() => {

    axios.get(`/api/class/classAssignments?id=${props.match.params.id}&classid=${props.match.params.classid}`).then((res) => {
      return setAssignments(res.data)
    }).catch(() => console.log('could not get at this time'));

  }, [props.id])


  let mappedAssignments = assignments.map(item => {
    return item.complete && item.points != null ?
      (
        <li>{item.name} {item.points}%</li>
      ) : (

        item.complete ? (
          !grade ? (
            <div>
              <li>{item.name} Submitted<button onClick={() => setGrade(true)}>Grade</button></li>
            </div>
          ) : (
              <div>

                <li>{item.name}  <Popup trigger={<button>Assignment</button>} position="bottom left">
                  {close => (
                    <div>
                      <div>
                        {item.name}
                      </div>
                      <iframe src={item.link}></iframe>
                      <button className="close" onClick={close}>
                        Close
                      </button>
                    </div>
                  )}
                </Popup><button onClick={() => setGrade(false)}>Submit</button></li>
              </div>
            )
        ) : (
            <div>
              <li>{item.name} Not Submitted</li>
            </div>
          )


      )
  })
  console.log(mappedAssignments)

  console.log(assignments)
  return (
    <>
      <Navbar />
      <div>
        {mappedAssignments}
      </div>

    </>
  )
}

export default Student
