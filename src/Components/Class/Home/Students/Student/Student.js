import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Popup from 'reactjs-popup'
import Alert from 'react-s-alert';
import Button from '@material-ui/core/Button';

const Student = (props) => {

  const [assignments, setAssignments] = useState([]);
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
          axios.put(`/api/class/gradeAssignment?id=${id}&assignmentId=${assignmentID}&classid=${classID}`, { grade }).then((res) => {
            setAssignments(res.data)
            Alert.success(`Graded assignment '${assignment.name} for ${props.student.firstname} ${props.student.lastname}.`, {
              position: 'top-right',
              effect: 'genie',
              beep: false,
              timeout: 4000,
              offset: 100
            });
          }).catch(() => console.log('failed to grade'));
        }

        function assignmentDisplay() {
          if (assignment.points && assignment.complete) {
            return (
              <div className="points">
                <div style={{ width: '3.25rem', display: 'flex', justifyContent: 'space-between' }}>
                  <p>{assignment.complete ? assignment.points : `N/A`}</p>
                  <p>/</p>
                  <p>{assignment.outof}</p>
                </div>
              </div>
            )
          } else {
            return (
              <div className="points">
                <Popup trigger={<Button>Grade</Button>} position="bottom left" contentStyle={{ width: '8%' }} style={{width:'rem'}}>
                  {close => (
                    <div >
                      <div>
                        <input type="number" name="grade" onChange={(e) => setGrade(e.target.value)} style={{ width: '4em' }} />
                        / {assignment.outof}
                      </div>
                      <Button className="close" onClick={close}>
                        Cancel
                  </Button>
                      <Button className="close" onClick={(e) => {
                        gradeAssignment(); close()
                      }}>
                        Submit
                  </Button>
                    </div>
                  )}
                </Popup>
              </div>
            )
          }
        }

        return (
          <div key={assignment.name} style={{width: "50em" }} className="assignment" style={{borderBottom: 'none'}}>
            <div className="info">
              <div className='title'>
                <p>{assignment.name}</p>
                <Popup trigger={<Button>View Assignment</Button>} position="bottom left">
                  {close => (
                    <div >
                      <div >
                        {assignment.name}
                      </div>
                      <iframe src={assignment.link} style={{ width: '50rem', height: '50vh' }}></iframe>
                      <Button className="close" onClick={close}>
                        Close
                       </Button>
                    </div>
                  )}
                </Popup>
              </div>
            {assignmentDisplay()}
            </div>
          </div>
        )

      })
    }
  }

  return (
    <>
      <div className='assignment' style={{borderTop:'none'}}>
        <div className='info'>
          <div className='title'>
            <span>{props.student.firstname} {props.student.lastname}</span> <Button onClick={() => toggleDisplay(!display)}>{display ? `Close` : `Details`}</Button>
          </div>
          <div className='points'>
            <div >
              <p>{props.grade[0]} </p>
              <p>{props.grade[1]}%</p>
            </div>
          </div>
        </div>
        <div className={display ? "more-info" : 'no-display'}>
          {mapAssignments()}
        </div>
      </div>


    </>
  )
}

export default Student



