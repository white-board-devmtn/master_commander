import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import BigCalendar from'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import './Calendar.css'
import NavBar from '../NavBar/NavBar'
import { getUser } from '../../Redux/Ducks/userReducer'

const localizer = BigCalendar.momentLocalizer(moment);

const Calendar = (props) => {

    useEffect(() => {
        props.getUser().then(() => {
            return;
        }).catch(() => props.history.push('/'));
    }, []);


    // setTimeout(() => {
    //     console.log(props);
    //     if (!props.user.loggedIn) props.history.push('/')
    // }, 1000);

    console.log(props.user);

    const [events, setEvents] = useState({
        events: [
            {
                'title': 'Halo throw-down',
                'allDay': false,
                'start': new Date(2019, 4, 17, 17, 0), // 10.00 AM
                'end': new Date(2019, 4, 17, 19, 0), // 2.00 PM 
            }
        ]
    })

    return (
        <>
        <NavBar/>
        <div className='calendar-component'>
            <div className='calendar-container'>
                <BigCalendar
                    localizer={localizer}
                    events={events.events}
                    startAccessor='start'
                    endAccessor='end'
                    style={{width: '95%', height: '95%'}}
                />
            </div>
            <div className='right-container'>
        
            </div>
        </div>
        </>
    )
}

function mapStateToProps(reduxState) {
    return {
      user: reduxState.user
    }
  };

export default connect(mapStateToProps, { getUser })(Calendar);