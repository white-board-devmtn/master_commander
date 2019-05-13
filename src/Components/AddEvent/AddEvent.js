import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import './AddEvent.css'
import 'react-datepicker/dist/react-datepicker.css'

function AddEvent (props) {

  const [startDate, setStartDate] = useState(new Date())

  return (
    <div className={props.addEvent ? 'addEvent-component' : 'no-display'}>
      <div className='empty-space' onClick={() => props.toggleAddEvent()}></div>
      <div className='addEvent-container'>
        <div className='addEvent-content'>
          <div>
            <h4>Date:</h4>
            <DatePicker 
              selected={startDate}
              onChange={setStartDate}
              showTimeSelect
              timeFormat="h:mm a"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
              timeCaption="time"
            />
          </div>
          <div>
            <h4>Event Title:</h4>
            <textarea style={{width: '20rem'}}/>
          </div>
          <div>
            <h4>Event Description:</h4>
            <textarea style={{height: '5rem', width: '20rem', textAlign: 'top', wordWrap: 'inherit'}}/>
          </div>
          <button className='create-event-button'>Create Event</button>
        </div>
      </div>
    </div>
  )
}

export default AddEvent