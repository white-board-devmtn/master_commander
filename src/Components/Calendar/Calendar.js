import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import BigCalendar from'react-big-calendar'
import AddEvent from './AddEvent/AddEvent'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';

import './Calendar.css'
import NavBar from '../NavBar/NavBar'
import { getUser } from '../../Redux/Ducks/userReducer'

const localizer = BigCalendar.momentLocalizer(moment);


const MyCalendar = (props) => {

  useEffect(() => {
      props.getUser().then(res => {
          const { id } = res.value.userData
          axios.get(`/api/getEvents?id=${id}`).then(res => {
            setEvents(() => {
              return res.data.map(event => {
                  return {title: event.event_title, start: new Date(event.start_date), end: new Date(event.end_date)}
              })
            });
          }).catch(err => console.log('error'));
      }).catch(() => props.history.push('/'));
      console.log(events)
  }, [])

  const [events, setEvents] = useState([])
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
        events={events}
        setEvents={setEvents}
      />
      <div className='calendar-container'>
        <BigCalendar
          localizer={localizer}
          events={events}
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