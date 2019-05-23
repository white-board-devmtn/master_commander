import React, {useState} from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

function EditEvent (props) {
  
  const [editEvent, setEditEvent] = useState(false);
  const [editText, setEditText] = useState(props.event.title)

  async function handleEditTitle() {
    axios.put('/api/editTitle', {id: props.event.id, title: editText}).then(() => {
      Alert.success(`Modified ${props.event.title}'s name to ${editText}`, {
        position: 'top-right',
        effect: 'genie',
        beep: false,
        timeout: 2000,
        offset: 100
      });
    }).catch(() => {
      Alert.error(`Failed to modify ${props.event.title}'s name`, {
        position: 'top-right',
        effect: 'genie',
        beep: false,
        timeout: 2000,
        offset: 100
      });
    })
    await props.getData();
    setEditEvent(false)
  }

  function deleteEvent() {
    axios.delete(`/api/deleteEvent/${props.event.id}`).then(() => {
      Alert.success(`Deleted ${props.event.title}`, {
        position: 'top-right',
        effect: 'genie',
        beep: false,
        timeout: 2000,
        offset: 100
      });
    }).catch(() => {
      Alert.error(`Failed to delete ${props.event.title}`, {
        position: 'top-right',
        effect: 'genie',
        beep: false,
        timeout: 2000,
        offset: 100
      });
    })
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
        <li className='daily-event-title'>
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