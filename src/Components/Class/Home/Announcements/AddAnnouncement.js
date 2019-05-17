
import React, { useState } from 'react'
import axios from 'axios';
import moment from 'moment'

const AddAnnouncement = (props) => {
  const [name, setName] = useState('');
  let [date, setDate] = useState('')


  function AddAnnouncement() {
    const post = {
      name,
      date,
      classid: props.classid,

    }
    axios.post('/api/class/addAnnouncement', post).then(res => {
      props.updateForum(res.data);
    }).catch(err => console.log('error adding post'));
    props.toggleAdd()
  }
  
  

  date = moment(new Date()).format('YYYY-MM-DD')
  console.log(date)
  return (

    <div className={props.adding ? 'addEvent-component' : 'no-display'}>
      <div className='empty-space' onClick={() => props.toggleAdd()}></div>
      <div className='addEvent-container'>
        <div className='addEvent-content'>
          Announcement: <textarea onChange={(event) => setName(event.target.value)} style={{width: '20rem', height: '10rem'}}/>
          
          <button onClick={() => AddAnnouncement()}>Create Announcement</button>
          <button onClick={() => props.toggleAdd(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddAnnouncement