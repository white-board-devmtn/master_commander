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
      axios.put('/api/class/submitAssignment', {file, assignmentID: props.assignment.ass_id}).then(() => {
        console.log('uploaded assignment');
      }).catch(() => console.log('failed to upload'));
    }
  }

  console.log(props.assignment)
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
                  {description} Date: {due_date}
                </>
              ) : (
                  <div>

                    {description}
                    <UploadFile
                      setFile={setFile}
                    />
                    <Button onclick={submitAssignment}>Submit</Button>
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
            <p>{name} - {description} Points Possible: {outof} Due Date: {due_date}</p>
          </div>
        ) : (
            <div className="assignment">
              <div className="info">
                <div className="title">
                  <span>{complete ? <p>&#10003;</p> : <p>&#x2717;</p>} <p>{name}</p></span>
                  <Button className="button" onClick={() => setEdit(!edit)}>{!edit ? 'Show Details' : 'Close'}</Button>
                </div>
                <div className="points">
                  <p>{points === null ? 'N/A' : points}</p>
                  <p>/</p>
                  <p>{outof}</p>
                </div>
              </div>
              <div className="more-info">
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