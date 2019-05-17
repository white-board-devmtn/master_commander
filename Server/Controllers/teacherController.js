const moment = require('moment')

module.exports = {
  createAssignment: async (req, res) => {
    const db = req.app.get('db')
    const { classid, name, description, points, dueDate, type } = req.body
    let time = new Date();
    time = moment(dueDate).format('YYYY-MM-DD')

    const assignmentID = await db.addAssignment(classid, name, description, points, time, type)
    console.log(assignmentID);
    console.log(classid);
    const students = await db.getStudentIDByClassID(classid);
    console.log(students);
    for (let i = 0; i < students.length; i++) {
      await db.addAssignmentToStudents(assignmentID[0].ass_id, students[i].user_id);
    }
    res.status(200).send('successfully created assignment');

  }
}