import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from '../../../NavBar/NavBar'
import Students from '../Students/Students';
import Popup from 'reactjs-popup'

const Student = (props) => {

  const [assignments, setAssignments] = useState([]);
  const [edit, setEdit] = useState(false)
  const [grade, setGrade] = useState(false)


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



  useEffect(() => {

    axios.get(`/api/class/classAssignments?id=${props.match.params.id}&classid=${props.match.params.classid}`).then((res) => {
      return setAssignments(res.data)
    }).catch(() => console.log('could not get at this time'));

  }, [props.id])

  function divide(num1, num2) {
    return num1 / num2 *100
  }



  console.log(props)
  let mappedAssignments = assignments.map(item => {

    function gradeAssignment() {
      const assignmentId = item.ass_id
      const { id } = props.match.params
      axios.put(`/api/class/gradeAssignment?id=${id}&assignmentId=${assignmentId}`, { grade }).then(() => {
        console.log('graded assignment');
      }).catch(() => console.log('failed to grade'));
    }


    return item.complete && item.points != null ?
      (
        <li>{item.name} {divide(item.points, item.outof)}%</li>
      ) : (

        item.complete ? (
          !edit ? (
            <div>
              <li>{item.name} Submitted<button onClick={() => setEdit(true)}>Grade</button></li>
            </div>
          ) : (
              <div >
                <div >

                  <li>{item.name} <div> <input placeholder='Grade' onChange={e => setGrade(e.target.value)}></input>
                    <button onClick={() => { setEdit(false); gradeAssignment() }}>Submit</button></div>

                    <Popup trigger={<button>View Assignment</button>} position="bottom left">
                      {close => (
                        <div >
                          <div >
                            {item.name}
                          </div>
                          <iframe src={item.link} style={{ width: '50rem', height: '50vh' }}></iframe>
                          <button className="close" onClick={close}>
                            Close
                      </button>
                        </div>
                      )}
                    </Popup>
                  </li>
                </div>
              </div>
            )
        ) : (
            <div>
              <li>{item.name} Not Submitted</li>
            </div>
          )


      )
  })

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


// default () => (
//   <Popup trigger={<button className="button"> Open Modal </button>} modal>
//     {close => (
//       <div className="modal">
//         <a className="close" onClick={close}>
//           &times;
//         </a>
//         <div className="header"> Modal Title </div>
//         <div className="content">
//           {' '}
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
//           Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
//           delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
//           <br />
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
//           commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
//           explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
//         </div>
//         <div className="actions">
//           <Popup
//             trigger={<button className="button"> Trigger </button>}
//             position="top center"
//             closeOnDocumentClick
//           >
//             <span>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
//               magni omnis delectus nemo, maxime molestiae dolorem numquam
//               mollitia, voluptate ea, accusamus excepturi deleniti ratione
//               sapiente! Laudantium, aperiam doloribus. Odit, aut.
//             </span>
//           </Popup>
//           <button
//             className="button"
//             onClick={() => {
//               console.log('modal closed ')
//               close()
//             }}
//           >
//             close modal
//           </button>
//         </div>
//       </div>
//     )}
//   </Popup>
// )
