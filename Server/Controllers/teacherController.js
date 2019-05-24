const moment = require('moment')

module.exports = {
  createAssignment: async (req, res) => {
    const db = req.app.get('db')
    const { id, classid, name, description, points, dueDate, type } = req.body
    let time = new Date();
    time = moment(dueDate).format('YYYY-MM-DD')

    const assignmentID = await db.addAssignment(classid, name, description, points, time, type)
    const students = await db.getStudentIDByClassID(classid);
    for (let i = 0; i < students.length; i++) {
      await db.addAssignmentToStudents(assignmentID[0].ass_id, students[i].user_id);
    }
    const assignments = await db.getAssignmentsByStudentId(id, classid)
    res.status(200).send(assignments);

  },

  createAnnouncement: async (req, res) => {
    const db = req.app.get('db')
    const { classid, name, date } = req.body;

    await db.createAnnouncement([classid, name, date])
    res.status(200).send('successfully created announcement')

  },

  getStudentsByAssignment: async (req, res) => {
    const db = req.app.get('db');
    const { classid, id } = req.query;

    const students = await db.getAllUserAssignmentsByAssignmentID(id, classid)
    res.status(200).send(students);
  },

  getStudentsByClassId: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.query;
    
    const students = await db.getStudentsByClassId(id)
    res.status(200).send(students)
  },

  gradeAssignment: async (req, res) => {
    const db = req.app.get('db');
    const { id, assignmentId, classid } = req.query;
    const { grade } = req.body
    await db.gradeAssignment([id, assignmentId, grade])
    const assignments = await db.getAssignmentsByStudentId(id, classid)
    res.status(200).send(assignments)
  }
}