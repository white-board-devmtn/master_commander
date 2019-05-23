
import React, { useState } from 'react'
import axios from 'axios';
import Alert from 'react-s-alert';

const AddAssignment = (props) => {
  const [newAssignment, setNewAssignment] = useState('')
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [type, setType] = useState('');

  function addAssignment() {
    const post = {
      name,
      description,
      points,
      dueDate,
      type,
      classid: props.classid,

    }
    axios.post('/api/class/addAssignment', post).then(res => {
      props.updateForum(res.data);
      Alert.success(`Added assignment ${post.name}`, {
        position: 'top-right',
        effect: 'genie',
        beep: false,
        timeout: 2000,
        offset: 100
      });
    }).catch(() => {
      console.log('error adding post');
      Alert.error(`Error adding assignment ${post.name}`, {
        position: 'top-right',
        effect: 'genie',
        beep: false,
        timeout: 2000,
        offset: 100
      });
    })
    props.toggleAdd()
  }

  // console.log(props)
  return (

    <div className={props.adding ? 'addEvent-component' : 'no-display'}>
      <div className='empty-space' onClick={() => props.toggleAdd()}></div>
      <div className='addEvent-container'>
        <div className='addEvent-content'>
          Name: <input value={name} onChange={e => setName(e.target.value)}></input>
          Description: <input value={description} onChange={e => setDescription(e.target.value)}></input>
          Points Possible: <input value={points} onChange={e => setPoints(e.target.value)}></input>
          Due Date: <input type='date' value={dueDate} onChange={e => setDueDate(e.target.value)}></input>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option></option>
            <option value='assignment'>Assignment</option>
            <option value='test'>Test</option>
          </select>
          <button onClick={() => addAssignment()}>Create Assignment</button>
          <button onClick={() => props.toggleAdd(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddAssignment