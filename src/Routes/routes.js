import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../Components/Login/Login'
import NavBar from '../Components/NavBar/NavBar'



export default (
    <HashRouter>
        <NavBar/>
        <Switch>
            <Route exact path='/' component={Login} />
        </Switch>
    </HashRouter>
)