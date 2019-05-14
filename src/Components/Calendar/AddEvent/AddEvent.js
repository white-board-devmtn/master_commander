import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import axios from 'axios';
import './AddEvent.css'
import 'react-datepicker/dist/react-datepicker.css'

function AddEvent (props) {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [title, setTitle] = useState('')


  function createEvent() {
    const sDate = moment(startDate).format('YYYY/MM/DD, HH:mm')
    const eDate = moment(endDate).format('YYYY/MM/DD, HH:mm')
    axios.put('/api/addEvent', {eventTitle: title, startDate: sDate, endDate: eDate}).then(res => {
      console.log(props);
      props.setEvents(() => {
        return res.data.map(event => {
            return {title: event.event_title, start: new Date(event.start_date), end: new Date(event.end_date)}
        })
      });
    }).catch(err => console.log(err))
    props.toggleAddEvent(!props.addEvent)
  }

  return (
    <div className={props.addEvent ? 'addEvent-component' : 'no-display'}>
      <div className='empty-space' onClick={() => props.toggleAddEvent()}></div>
      <div className='addEvent-container'>
        <div className='addEvent-content'>
          <div style={{marginBottom: '.5rem'}}>
            <h4>Start Date:</h4>
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
          <div style={{marginBottom: '.5rem'}}>
            <h4>End Date:</h4>
            <DatePicker 
              selected={endDate}
              onChange={setEndDate}
              showTimeSelect
              showYearDropdown
              timeFormat="H:mm"
              timeIntervals={15}
              dateFormat="yyyy/MM/dd HH:mm"
              timeCaption="time"
            />
          </div>
          <div style={{marginBottom: '.5rem'}}>
            <h4>Event Title:</h4>
            <textarea onChange={(event) => setTitle(event.target.value)} style={{width: '20rem'}}/>
          </div>
          <button className='create-event-button' onClick={createEvent}>Create Event</button>
        </div>
      </div>
    </div>
  )
}

export default AddEvent