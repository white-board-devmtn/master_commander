import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../../Redux/Ducks/userReducer'
import Button from '@material-ui/core/Button';
import moment from 'moment'

import UploadFile from '../shared/UploadFile';


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

  function divide(num1, num2) {
    return num1 / num2
  }

  let { name, description, points, outof, due_date, complete } = props.assignment
  due_date = moment(due_date).format('M-D-YYYY')

  function showDetails() {
    return (

      !edit ? (
        <p onClick={() => setEdit(true)}>Show Details</p>
      ) : (
          <div>
            {
              complete ? (
                <>
                  {description} Date: {due_date}
                  <UploadFile
                    setFile={setFile}
                  />
                  <Button color='secondary'>Submit</Button>
                  <p onClick={() => setEdit(false)}>Close</p>
                </>
              ) : (
                  <div>
                    {description}
                    <button>Submit</button>
                    <p onClick={() => setEdit(false)}>Close</p>
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
          <div>
            <li>{name} - {description} Points Possible: {outof} Due Date: {due_date}</li>
          </div>

        ) : (
            <div>
              {
                complete ? (
                  <li>{name} -  Score: {divide(points, outof / 100)}%</li>
                ) : (
                    <li>{name} - Points Possible: {outof} Due Date: {due_date}</li>
                  )
              }
              {showDetails()}
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