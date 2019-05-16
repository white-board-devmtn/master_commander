import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar'
import AddEvent from './AddEvent/AddEvent'
import moment from 'moment'
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

const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class MyCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      addEvent: false,
      time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      date: new Date(),
      today: []
    }
    this.clicker = React.createRef()
  }
  // const [events, setEvents] = useState([])
  // const [addEvent, toggleAddEvent] = useState(false)
  // const [time, setTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
  // const [date, setDate] = useState(new Date())
  // const [today, setToday] = useState([])
  
  componentDidMount() {
    this.timeClock();
    this.getData();
    // document.getElementById('clicker2').click(console.log('click'))
    // this.clicker.current.focus(console.log('clicker'))
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
      arr.push({title: event.title, date: split})
    })
    
    arr.map(event => {
      if(event.date === dateToday) {
        todayArr.push(event.title)
      }
    })

    this.setState({
      today: todayArr
    })
  }
  
  moveEvent = ({ event, start, end }) => {
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

  toggleAddEvent = () => this.setState({addEvent: !this.state.addEvent})

  handleChange = (date) => {
    this.setState({
      date: date
    });

    this.dateToEvent(date);
  }

  render () {
    return (
      <div className='calendar-component'>
        <NavBar />
        <AddEvent
          addEvent={this.state.addEvent}
          toggleAddEvent={this.toggleAddEvent}
          events={this.state.events}
          getData={this.getData}
        />
        <div className='calendar-container'>
          <DragAndDropCalendar
            selectable
            events={this.state.events}
            onEventDrop={this.moveEvent}
            localizer={localizer}
            defaultView={BigCalendar.Views.MONTH}
            defaultDate={new Date(this.state.date)}
            style={{ width: '95%', height: '95%' }}
          />
        </div>
        <div className='right-container'>
          <hr/>
          <p ref={this.clicker} style={{ textDecoration: 'underline' }}>Today</p>
          <p>{this.state.time}</p>
          <DatePicker
            inline
            selected={this.state.date}
            onChange={this.handleChange}
            showYearDropdown
            style={{ marginTop: '2rem' }}
          />
          <p>Events on {JSON.stringify(this.state.date.toString()).split('').splice(1, 10).join('')}</p>
          <div className='event-list'>
            {this.state.today.map((event, i) => {
              return (
                <div className="event-list-item" key={i}>
                  <li >
                    {event}
                  </li>
                  <div>
                    swag
                  </div>
                </div>
              )
            })}
          </div>
          <button id="clicker2" className='add-event-button' onClick={() => this.setState({ addEvent: !this.state.addEvent })}>Add Event</button>
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