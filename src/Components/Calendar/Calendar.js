import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar'
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
  
  const [events, setEvents] = useState([])
  const [addEvent, toggleAddEvent] = useState(false)
  const [time, setTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
  const [date, setDate] = useState(new Date())
  const [today, setToday] = useState([])
  
  useEffect(() => {
    props.getUser().then(res => {
      const { id } = res.value.userData
      axios.get(`/api/getEvents?id=${id}`).then(res => {
        let myEvents = [];
        res.data.map(event => {
          myEvents.push({ title: event.event_title, start: new Date(event.start_date), end: new Date(event.end_date)})
        })
        return setEvents(myEvents)
      }).catch(err => console.log('error'));
    }).catch(() => props.history.push('/'));
  }, [])

  useEffect(() => {
    setInterval(function () { setTime(moment().format('MMMM Do YYYY, h:mm:ss a')) })
  }, [time])

  useEffect(() => {
    let arr = [];
    let todayArr = [];
    let dateToday = JSON.stringify(date.toString()).split('').splice(1, 15).join('');
    events.map((event, i) => {
      let split = JSON.stringify(event.start.toString()).split('').splice(1, 15).join('');
      arr.push({title: event.title, date: split})
    })
    
    arr.map((event, i) => {
      if(event.date == dateToday) {
        todayArr.push(event.title)
      }
    })

    setToday(todayArr)
  }, [events, date])


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
        <hr/>
        <p style={{ textDecoration: 'underline' }}>Today</p>
        <p>{time}</p>
        <DatePicker
          inline
          selected={date}
          onChange={setDate}
          showYearDropdown
          style={{ marginTop: '2rem' }}
        />
        <p>Events on {JSON.stringify(date.toString()).split('').splice(1, 10).join('')}</p>
        <div className='event-list'>
          {today.map((event, i) => {
            return (
              <li style={{margin: '1rem 0rem 1rem 1rem'}} key={i}>
                {event}
              </li>
            )
          })}
        </div>
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