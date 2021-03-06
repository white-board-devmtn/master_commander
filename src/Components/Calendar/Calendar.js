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
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import Alert from 'react-s-alert';

import './Calendar.css'
import NavBar from '../NavBar/NavBar'
import { getUser } from '../../Redux/Ducks/userReducer'
import EditEvent from './EditEvent';

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
        let myAssignments = [];
        res.data.map(assignment => {
          myAssignments.push({ assignment_id: assignment.id, assignment_type: assignment.assignment_type, title: assignment.title, start: new Date(assignment.duedate), end: new Date(assignment.duedate) })
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
          myEvents.push({ id: event.event_id, title: event.event_title, start: new Date(event.start_date), end: new Date(event.end_date) })
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
    setInterval(() => this.setState({ time: (moment().format('MMMM Do YYYY, h:mm:ss a')) }), 1000)
  }

  dateToEvent = (date) => {
    let arr = [];
    let todayArr = [];
    let dateToday = JSON.stringify(date.toString()).split('').splice(1, 15).join('');

    this.state.events.map(event => {
      let split = JSON.stringify(event.start.toString()).split('').splice(1, 15).join('');
      arr.push({ id: event.id, title: event.title, date: split })
    })

    this.state.assignments.map(event => {
      let split = JSON.stringify(event.start.toString()).split('').splice(1, 15).join('');
      arr.push({ assignment_id: event.assignment_id, title: event.title, date: split })
    })

    arr.map(event => {
      if (event.date === dateToday) {
        event.assignment_id ? todayArr.push({ assignment_id: event.assignment_id, title: event.title }) : todayArr.push({ id: event.id, title: event.title })
      }
    })

    this.setState({
      today: todayArr
    })
  }

  moveEvent = ({ event, start, end }) => {
    if (event.assignment_id) return
    const { events } = this.state;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    })
    axios.put('/api/updateEvent', updatedEvent)
    Alert.success(`Moved ${event.title} from ${moment(events[idx].start).format('MM-DD-YYYY, h:mm a')} to ${moment(updatedEvent.start).format('MM-DD-YYYY, h:mm a')}`, {
      position: 'bottom-right',
      effect: 'genie',
      beep: false,
      timeout: 4000,
      offset: 100
    });

    this.dateToEvent(this.state.date)
  }

  resizeEvent({ event, start, end }) {
    if (event.assignment_id) return
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

    axios.put('/api/updateEvent', nextEvents[index])
    Alert.success(`Modified ${event.title} from ${moment(event.start).format('MM-DD-YYYY, hh:mm a')}-${moment(event.end).format('MM-DD-YYYY, hh:mm a')} to ${moment(nextEvents[index].start).format('MM-DD-YYYY, hh:mma')}-${moment(nextEvents[index].end).format('MM-DD-YYYY, hh:mma')}`, {
      position: 'bottom-right',
      effect: 'genie',
      beep: false,
      timeout: 4000,
      offset: 100
    });

    this.setState({
      events: nextEvents
    });
  };

  toggleAddEvent = () => this.setState({ addEvent: !this.state.addEvent })

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
      color: '#9c00da',
      border: '1px solid #9c00da',
      display: 'block',
      fontWeight: '900',
      textIndent: '.3rem'
    };

    if (event.assignment_id) {
      if (event.assignment_type === 'assignment') {
        style.border = '1px solid #D13030'
        style.color = '#D13030'
      }
      if (event.assignment_type === 'test') {
        style.border = '1px solid rgb(29, 109, 0)'
        style.color = 'rgb(29, 109, 0)'
      }
    }

    return {
      style: style
    };
  }

  render() {

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
        <div style={{ width: 'calc(100vw - 7rem', height: '100vh', display: 'flex' }}>
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
            <hr />
            <p id='clicker' style={{ textDecoration: 'underline' }}>Today</p>
            <p style={{marginBottom: '1rem'}}>{this.state.time}</p>
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
            <div style={{width: '10rem', marginTop: '2rem'}}>
              {/* <h4>Key:</h4> */}
              <h4 style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>Your Events:<div style={{width: '.8rem', height: '.8rem', borderRadius: '3px', border: '2px solid #9c00da'}}/></h4>
              <h4 style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>Assignments:<div style={{width: '.8rem', height: '.8rem', borderRadius: '3px', border: '2px solid #D13030'}}/></h4>
              <h4 style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>Tests:<div style={{width: '.8rem', height: '.8rem', borderRadius: '3px', border: '2px solid rgb(29, 109, 0)'}}/></h4>
            </div>
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