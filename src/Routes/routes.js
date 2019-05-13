import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../Components/Login/Login'
import NavBar from '../Components/NavBar/NavBar'
import Dashboard from '../Components/Dashboard/Dashboard'
import Profile from '../Components/Profile/Profile'
import Calendar from '../Components/Calendar/Calendar'




export default (
    <HashRouter>
        <Switch>
            <Route path='/dashboard' component={Dashboard} />
            <Route exact path='/' component={Login} />
            <Route path='/dashboard'/>
            <Route path='/profile' component={Profile} />
            <Route path='/calendar' component={Calendar} />
        </Switch>
    </HashRouter>
)