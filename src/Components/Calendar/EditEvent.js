import React, {useState} from 'react';
import axios from 'axios';

function EditEvent (props) {
  
  const [editEvent, setEditEvent] = useState(false);
  const [editText, setEditText] = useState(props.event.title)

  async function handleEditTitle() {
    axios.put('/api/editTitle', {id: props.event.id, title: editText})
      .catch(err => console.log(err))
    await props.getData();
    setEditEvent(false)
  }

  function deleteEvent() {
    axios.delete(`/api/deleteEvent/${props.event.id}`)
      .catch(err => console.log(err))
    props.getData();
  }

  return editEvent ? (
      <div className="event-list-item">
        <input placeholder={props.event.title} onChange={e => setEditText(e.target.value)}/>
        <div className='editing-event'>
          <i className="fas fa-times edit-event-icons" onClick={() => setEditEvent(false)}></i>
          <i className="fas fa-check edit-event-icons" onClick={() => handleEditTitle()}></i>
        </div>
      </div>
    ) : (
      <div className="event-list-item">
        <li>
          {props.event.title}
        </li>
        <div className='edit-event-container'>
          <i className="fas fa-pencil-alt edit-event-icons" onClick={() => setEditEvent(true)}></i>
          <i className="fas fa-trash-alt edit-event-icons" onClick={() => deleteEvent()}></i>
        </div>
      </div>
    )
}

export default EditEvent