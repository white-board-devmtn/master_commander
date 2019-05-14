import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import BigCalendar from'react-big-calendar'
import AddEvent from '../AddEvent/AddEvent'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import './Calendar.css'
import NavBar from '../NavBar/NavBar'
import { getUser } from '../../Redux/Ducks/userReducer'

const localizer = BigCalendar.momentLocalizer(moment);


const MyCalendar = (props) => {

  useEffect(() => {
      props.getUser().then(() => {
          return;
      }).catch(() => props.history.push('/'));
  }, []);


  const [events, setEvents] = useState({
    events: [
      {
        'title': 'Halo throw-down',
        'start': new Date('2019/05/14, 11:36'),
        'end': new Date('2019/05/14, 12:45'),
      }
    ]
  })
  const [addEvent, toggleAddEvent] = useState(false)
  const [time, setTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
  const [startDate, setStartDate] = useState(new Date())

  setInterval(function(){setTime(moment().format('MMMM Do YYYY, h:mm:ss a'))})

  return (
    <div className='calendar-component'>
      <NavBar />
      <AddEvent
        addEvent={addEvent}
        toggleAddEvent={toggleAddEvent}
      />
      <div className='calendar-container'>
        <BigCalendar
          localizer={localizer}
          events={events.events}
          startAccessor='start'
          endAccessor='end'
          style={{ width: '95%', height: '95%' }}
        />
      </div>
      <div className='right-container'>
        <DatePicker
          inline
          selected={startDate}
          onChange={setStartDate}
          showYearDropdown
          style={{ marginTop: '2rem'}}
        />
        <hr />
        <p style={{textDecoration: 'underline'}}>Today</p>
        <p>{time}</p>
        <button className='add-event-button' onClick={() => toggleAddEvent(!addEvent)}>Add Event</button>
      </div>
    </div>
  )

}


function mapStateToProps(reduxState) {
    return {
      user: reduxState.user
    }
  };

export default connect(mapStateToProps, { getUser })(MyCalendar);