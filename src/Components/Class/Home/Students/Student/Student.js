import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Popup from 'reactjs-popup'
import Alert from 'react-s-alert';

const Student = (props) => {

  const [assignments, setAssignments] = useState([]);
  const [edit, setEdit] = useState(false);
  const [grade, setGrade] = useState(false);
  const [display, toggleDisplay] = useState(false);


  useEffect(() => {
    return () => {
      return assignments
    };
  }, [assignments])

  useEffect(() => {
    return () => {
      return grade;
    }
  }, [grade])

  const { id, classID } = props;

  useEffect(() => {
    axios.get(`/api/class/classAssignments?id=${id}&classid=${classID}`).then((res) => {
      return setAssignments(res.data)
    }).catch(() => console.log('could not get at this time'));

  }, [props.id])


  function mapAssignments() {
    if (assignments.length) {
      return assignments.map(assignment => {


        function gradeAssignment() { // Function to grade assignment
          const assignmentID = assignment.ass_id;
          axios.put(`/api/class/gradeAssignment?id=${id}&assignmentId=${assignmentID}`, { grade }).then((res) => {
            Alert.success(`Graded assignment '${assignment.name}. Refresh the page to see update.'`, {
              position: 'top-right',
              effect: 'genie',
              beep: false,
              timeout: 2000,
              offset: 100
            });
          }).catch(() => console.log('failed to grade'));
        }

        function assignmentDisplay() {
          if (assignment.points && assignment.complete) {
            return (
              <div style={{ display: 'flex' }}>
                <h2>{assignment.complete ? assignment.points : `N/A`}</h2>
                <h2>/</h2>
                <h2>{assignment.outof}</h2>
              </div>
            )
          } else {
            return (
              <div style={{ display: 'flex' }}>
                <Popup trigger={<button>Grade Now</button>} position="bottom left" contentStyle={{width: '8%'}}>
              {close => (
                <div >
                  <div>
                  <input type="number" name="grade" onChange={(e) => setGrade(e.target.value)} style={{width: '4em'}}/>
                  / {assignment.outof}
                  </div>
                  <button className="close" onClick={close}>
                    Cancel
                  </button>
                  <button className="close" onClick={(e) => {
                    gradeAssignment(); close()
                  }}>
                    Submit
                  </button>
                </div>
              )}
            </Popup>
              </div>
            )
          }
        }

        return (
          <div key={assignment.name} style={{ display: 'flex', justifyContent: 'space-between', width: "50em" }}>
            <h2>{assignment.name}</h2>
            <Popup trigger={<button>View Assignment</button>} position="bottom left">
              {close => (
                <div >
                  <div >
                    {assignment.name}
                  </div>
                  <iframe src={assignment.link} style={{ width: '50rem', height: '50vh' }}></iframe>
                  <button className="close" onClick={close}>
                    Close
                       </button>
                </div>
              )}
            </Popup>
            {assignmentDisplay()}
          </div>
        )

      })
    }
  }

  return (
    <>
      <div>
        <button onClick={() => toggleDisplay(!display)}>{display ? `Show more` : `Hide`}</button>
        {display ? mapAssignments() : <></>}
      </div>

    </>
  )
}

export default Student



