import React, {useState} from 'react';
import BigCalendar from'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

const localizer = BigCalendar.momentLocalizer(moment);

function Calendar (props) {

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
    )
}

export default Calendar