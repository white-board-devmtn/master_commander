import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../Components/Login/Login'
import NavBar from '../Components/NavBar/NavBar'
import Classes from '../Components/Classes/Classes'
import Profile from '../Components/Profile/Profile'



export default (
    <HashRouter>
        <NavBar/>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/dashboard'/>
            <Route path='/profile' component={Profile} />
        </Switch>
    </HashRouter>
)