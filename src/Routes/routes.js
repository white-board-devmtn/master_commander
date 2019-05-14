import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../Components/Login/Login'
import MyCalendar from '../Components/Calendar/Calendar'
import Dashboard from '../Components/Dashboard/Dashboard'
import Profile from '../Components/Profile/Profile'

export default (
    <HashRouter>
        <Switch>
            <Route path='/dashboard' component={Dashboard} />
            <Route exact path='/' component={Login} />
            <Route path='/calendar' component={MyCalendar} />
            <Route path='/profile' component={Profile} />
        </Switch>
    </HashRouter>
)