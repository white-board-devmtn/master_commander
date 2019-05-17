const moment = require('moment')

module.exports = {
  createAssignment: async (req, res) => {
    const db = req.app.get('db')
    const { classid, name, description, points, dueDate, type } = req.body
    let time = new Date();
    time = moment(dueDate).format('YYYY-MM-DD')

    const assignment = await db.addAssignment(classid, name, description, points, time, type)
    res.status(200).send(assignment)

  }
}