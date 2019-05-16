import React, {useState} from 'react'
import axios from 'axios';

import './AddPost.css'
import 'react-datepicker/dist/react-datepicker.css'

function AddPost (props) {
  const [newPost, setNewPost] = useState('')



  function addPost() {
    const post = {
      id: props.id,
      classid: props.classid,
      post: newPost
    }
    axios.put('/api/class/addPost', post).then(res => {
      props.updateForum(res.data);
    }).catch(err => console.log('error adding post'));
    props.toggleAdd()
  }

  return (
    <div className={props.adding ? 'addEvent-component' : 'no-display'}>
      <div className='empty-space' onClick={() => props.toggleAdd()}></div>
      <div className='addEvent-container'>
        <div className='addEvent-content'>
          <div style={{marginBottom: '.5rem'}}>
            <h4>Post:</h4>
            <textarea onChange={(event) => setNewPost(event.target.value)} style={{width: '20rem', minHeight: '10rem'}}/>
          </div>
          <button className='create-event-button' onClick={addPost}>Create Post</button>
        </div>
      </div>
    </div>
  )
}

export default AddPost