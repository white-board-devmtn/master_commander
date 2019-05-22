import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../../../../Redux/Ducks/userReducer';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';

import UploadFile from '../../../shared/UploadFile';


const Assignment = (props) => {

  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState('');

  useEffect(() => {
    props.getUser()
  }, [])

  useEffect(() => {
    return () => {
      return file;
    }
  }, [file])

  function submitAssignment() {
    if (file) {
      const assignmentId = props.assignment.ass_id
      const {id} = props.user
      axios.put(`/api/class/submitAssignment?id=${id}&assignmentId=${assignmentId}`, {file}).then(() => {
        console.log('uploaded assignment');
      }).catch(() => console.log('failed to upload'));
      console.log(id)
      console.log(assignmentId)
      console.log(file)
    }
  }

  let { name, description, points, outof, due_date, complete } = props.assignment
  due_date = moment(due_date).format('M-D-YYYY')

  function showDetails() {
    return (

      !edit ? (
        <></>
      ) : (
          <div>
            {
              complete ? (
                <>
                  <h1 style={{fontWeight: '900'}}>{description}</h1>
                   Submitted: {due_date}
                </>
              ) : (
                  <div>
                    <h1 style={{fontWeight: '900'}}>{description}</h1>
                    <UploadFile
                      setFile={setFile}
                    />
                    <Button onClick={submitAssignment}>Submit</Button>
                  </div>
                )
            }
          </div>
        )
    )
  }

  // due_date = moment(due_date).format('MM-DD-YYYY')
  return (
    <>
      {
        props.user.isTeacher ? (
          <div className="assignment">
            <div style={{width: '95%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '.5rem 0rem'}}>
              <p>{name} - {description}</p>
              <div>
                <p>Points Possible: {outof}</p> 
                <p>Due Date: {due_date}</p>
              </div>
            </div>
          </div>
        ) : (
            <div className="assignment">
              <div className="info">
                <div className="title">
                  <span>{complete ? <p>&#10003;</p> : <p>&#x2717;</p>}<hr/><p style={{width: '25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{name}</p></span>
                  <Button style={{textAlign: 'center'}} className="button" onClick={() => setEdit(!edit)}>{!edit ? 'Details' : 'Close'}</Button>
                </div>
                <div className="points">
                  <div style={{width: '3.25rem', display: 'flex', justifyContent : 'space-between'}}>
                    <p>{points === null ? 'N/A' : points}</p>
                    <p>/</p>
                  </div>
                  <p>{outof}</p>
                </div>
              </div>
              <div className={edit ? "more-info" : 'no-display'}>
                {showDetails()}
              </div>
            </div>)
      }
    </>
  )
}

function mapStateToProps(reduxState) {
  // console.log(reduxState)
  return {
    user: reduxState.user
  }
};

export default connect(mapStateToProps, { getUser })(Assignment)