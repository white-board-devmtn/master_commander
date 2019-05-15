const express = require('express');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Master Chief checking in')
})

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// CONTROLLERS
const authC = require('./Controllers/authController');
const eventC = require('./Controllers/eventController');
const userC = require('./Controllers/userController');
const amazonCtrl = require('./Controllers/amazonController');

// AUTH ENDPOINTS
app.post('/Login', authC.login)
app.post('/Register', authC.register)
app.get('/api/getuser', authC.getUser)
app.delete('/Logout', authC.logout)
app.put('/api/profile/:id', authC.updateUser)

// EVENT ENDPOINTS //
app.get('/api/getEvents', eventC.getEventsByID)
app.put('/api/addEvent', eventC.addEvent)

// USER ENDPOINTS //
app.put('/aws/getLink', amazonCtrl.getAWS); // GETS AWS LINK
app.get('/api/getClassList', userC.getClassList)

app.listen(SERVER_PORT, () => console.log(`It's over ${SERVER_PORT}!!!`))