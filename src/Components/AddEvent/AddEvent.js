import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import './AddEvent.css'
import 'react-datepicker/dist/react-datepicker.css'

function AddEvent (props) {

  const [startDate, setStartDate] = useState(new Date())

  function dateFormatChanger(date) {
    date = moment(date).format('YYYY/MM/DD, HH:mm')
    console.log(date);
    // let month = date.substring()
  }

  async function createEvent() {
    let date = startDate
    await dateFormatChanger(date)
  }

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
              showYearDropdown
              timeFormat="H:mm"
              timeIntervals={15}
              dateFormat="yyyy/MM/dd HH:mm"
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
          <button className='create-event-button' onClick={createEvent}>Create Event</button>
        </div>
      </div>
    </div>
  )
}

export default AddEvent