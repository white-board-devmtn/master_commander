import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar'
import AddEvent from '../AddEvent/AddEvent'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import axios from 'axios';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import ReactDOM from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import './Calendar.css'
import NavBar from '../NavBar/NavBar'
import { getUser } from '../../Redux/Ducks/userReducer'
import EditEvent from './EditEvent';
import styled from 'styled-components';

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class MyCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      assignments: [],
      addEvent: false,
      time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      date: new Date(),
      today: [],
      editEvent: false
    }

    this.resizeEvent = this.resizeEvent.bind(this)
  }
  
  componentDidMount() {
    this.timeClock();
    this.getData();
    this.getAssignments();
  }

  getAssignments = () => {
    this.props.getUser().then(res => {
      const { id } = res.value.userData
       axios.get(`/api/getAssignments/${id}`).then(res => {
        console.log(res.data)
        let myAssignments = [];
        res.data.map(assignment => {
          myAssignments.push({ assignment_id: assignment.id, title: assignment.title, start: new Date(assignment.duedate), end: new Date(assignment.duedate)})
        })
        this.setState({
          assignments: myAssignments
        })
        this.dateToEvent(this.state.date);
        // setTimeout(() => document.getElementById('clicker').focus(console.log('click')), 1000)
        
      }).catch(err => console.log('error'));
    }).catch(() => this.props.history.push('/'));
  }

  getData = () => {
    this.props.getUser().then(res => {
      const { id } = res.value.userData
       axios.get(`/api/getEvents?id=${id}`).then(res => {
        let myEvents = [];
        res.data.map(event => {
          myEvents.push({ id: event.event_id, title: event.event_title, start: new Date(event.start_date), end: new Date(event.end_date)})
        })
        this.setState({
          events: myEvents
        })
        this.dateToEvent(this.state.date);
        // setTimeout(() => document.getElementById('clicker').focus(console.log('click')), 1000)
        
      }).catch(err => console.log('error'));
    }).catch(() => this.props.history.push('/'));
  }
  
  timeClock = () => {
    setInterval(() => this.setState({time: (moment().format('MMMM Do YYYY, h:mm:ss a'))}), 1000)
  }
  
  dateToEvent = (date) => {
    let arr = [];
    let todayArr = [];
    let dateToday = JSON.stringify(date.toString()).split('').splice(1, 15).join('');
    
    this.state.events.map(event => {
      let split = JSON.stringify(event.start.toString()).split('').splice(1, 15).join('');
      arr.push({id: event.id, title: event.title, date: split})
    })

    
    arr.map(event => {
      if(event.date === dateToday) {
        todayArr.push({id: event.id, title: event.title})
      }
    })

    this.setState({
      today: todayArr
    })
  }
  
  moveEvent = ({ event, start, end }) => {
    console.log(event)
    if(event.assignment_id) return
    const {events} = this.state;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };
    
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    
    this.setState({
      events: nextEvents
    })
    axios.put('/api/updateEvent', updatedEvent)

    this.dateToEvent(this.state.date)
  }

  resizeEvent({ event, start, end }) {
    if(event.assignment_id) return
    const { events } = this.state;
    let index = 0
    const nextEvents = events.map((existingEvent, i) => {
      if (existingEvent.id == event.id) {
        index = i;
      }
      return existingEvent.id == event.id
      ? { ...existingEvent, start, end }
      : existingEvent;
    });
    console.log('nextEvents', nextEvents[index])

    axios.put('/api/updateEvent', nextEvents[index])

    this.setState({
      events: nextEvents
    });
  };

  toggleAddEvent = () => this.setState({addEvent: !this.state.addEvent})

  handleChange = (date) => {
    this.setState({
      date: date
    });

    this.dateToEvent(date);
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    var style = {
        backgroundColor: 'white',
        borderRadius: '3px',
        opacity: 0.8,
        color: 'red',
        border: '1px solid red',
        display: 'block',
        fontWeight: '900',
        textIndent: '.3rem'
    };

    if(event.assignment_id) {
      style.border = '1px solid #8b68ff'
      style.color = '#8b68ff'
    }

    return {
        style: style
    };
  }

  render () {

    const calendarEvents = []
    this.state.events.map(event => {
      calendarEvents.push(event)
    })
    this.state.assignments.map(assignment => {
      calendarEvents.push(assignment)
    })

    const eventsList = this.state.today.map((event, i) => {
      return <EditEvent
        key={i}
        event={event}
        getData={this.getData}
      />
    })

    return (
      <div className='calendar-component'>
        <NavBar />
        <AddEvent
          addEvent={this.state.addEvent}
          toggleAddEvent={this.toggleAddEvent}
          events={this.state.events}
          getData={this.getData}
        />
        <div style={{width: 'calc(100vw - 7rem', height: '100vh', display: 'flex'}}>
          <div className='calendar-container'>
            <DragAndDropCalendar
              selectable
              events={calendarEvents}
              onEventDrop={this.moveEvent}
              resizable
              onEventResize={this.resizeEvent}
              localizer={localizer}
              defaultView={BigCalendar.Views.MONTH}
              defaultDate={new Date(this.state.date)}
              eventPropGetter={(this.eventStyleGetter)}
              style={{ width: '95%', height: '95%' }}
            />
          </div>
          <div className='right-container'>
            <hr/>
            <p id='clicker' style={{ textDecoration: 'underline' }}>Today</p>
            <p>{this.state.time}</p>
            <DatePicker
              inline
              selected={this.state.date}
              onChange={this.handleChange}
              showYearDropdown
              style={{ marginTop: '2rem', width: '90%' }}
            />
            <p>Events on {JSON.stringify(this.state.date.toString()).split('').splice(1, 10).join('')}</p>
            <div className='event-list'>
              {eventsList}
            </div>
            <button id="clicker2" className='add-event-button' onClick={() => this.setState({ addEvent: !this.state.addEvent })}>Add Event</button>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(reduxState) {
  return {
    user: reduxState.user
  }
};

export default connect(mapStateToProps, { getUser })(DragDropContext(HTML5Backend)(MyCalendar));