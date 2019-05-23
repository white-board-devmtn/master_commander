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
const teachCtrl = require('./Controllers/teacherController');
const assignC = require('./Controllers/assignmentController');

// AUTH ENDPOINTS
app.post('/Login', authC.login)
app.post('/Register', authC.register)
app.get('/api/getuser', authC.getUser)
app.delete('/Logout', authC.logout)
app.put('/api/profile/:id', authC.updateUser)

// ASS ENDPOINTS
app.get('/api/getAssignments/:id', assignC.getAssignments)

// EVENT ENDPOINTS //
app.get('/api/getEvents', eventC.getEventsByID)
app.put('/api/addEvent', eventC.addEvent)
app.put('/api/updateEvent', eventC.updateEvent)
app.put('/api/editTitle', eventC.editTitle)
app.delete('/api/deleteEvent/:id', eventC.deleteEvent)

// USER ENDPOINTS //
app.put('/aws/getLink', amazonCtrl.getAWS); // GETS AWS LINK
app.get('/api/getClassList', userC.getClassList)
app.get('/api/class/upcomingAssignments', userC.getUpcomingAssignments)

app.get('/api/class/classAssignments', userC.getClassAssignments)

app.get('/api/class/getForum', userC.getForumPosts) // GETS FORUM POST BY CLASS ID 
app.put('/api/class/addPost', userC.addForumPost) // ADDS FORUM POST
app.get('/api/class/getAnnouncements', userC.getAnnouncements) // GETS ANNOUNCEMENTS
app.post('/api/class/addAnnouncement', teachCtrl.createAnnouncement)
app.get('/api/profile/getGrades/:id', userC.getGradesById); // Will get the class name, with points possible and points recieved for every assignment that has been graded. 
app.get('/api/class/recentlyGraded', userC.getRecentlyGraded); //GETS RECENT GRADED ASSIGNMENTS
app.put('/api/class/submitAssignment', userC.submitAssignment) //student submitting the assignment
app.get('/api/class/classTitle', userC.getClassTitle)

// TEACHER ENDPOINTS 
app.post('/api/class/addAssignment', teachCtrl.createAssignment);
app.get('/api/class/geAssignmentStudents', teachCtrl.getStudentsByAssignment); // using assignment id and class id will select all students with that assignment id, with their grade.
app.get('/api/class/classStudents', teachCtrl.getStudentsByClassId);
app.put('/api/class/gradeAssignment', teachCtrl.gradeAssignment)


app.listen(SERVER_PORT, () => console.log(`It's over ${SERVER_PORT}!!!`))