import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import BigCalendar from'react-big-calendar'
import React, { useState } from 'react';
import AddEvent from '../AddEvent/AddEvent'
import BigCalendar from 'react-big-calendar'
import Calendar from 'react-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

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

function MyCalendar(props) {


  const [events, setEvents] = useState({
    events: [
      {
        'title': 'Halo throw-down',
        'allDay': false,
        'start': new Date(2019, 4, 17, 17, 0),
        'end': new Date(2019, 4, 17, 19, 0),
      }
    ]
  })
  const [addEvent, toggleAddEvent] = useState(false)
  const [time, setTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))

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
        <Calendar
          style={{width: ''}}
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