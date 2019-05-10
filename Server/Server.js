const express = require('express');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const controller = require('./Controllers/controller');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

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

app.post('/Login', controller.login)

app.listen(SERVER_PORT, () => console.log(`It's over ${SERVER_PORT}!!!`))