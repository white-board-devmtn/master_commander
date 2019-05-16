const moment = require('moment')

module.exports = {
  getClassList: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.query;

    const classes = await db.getClassesByUserID(id)
    res.status(200).send(classes);
  },

  getUpcomingAssignments: async (req, res) => {
    const db = req.app.get('db');
    const {id, classid} = req.query
    let time = new Date();
    time = moment(time).format('YYYY-MM-DD')

    const assignments = await db.getUpcomingAssignments(id, classid, time)
    res.status(200).send(assignments)

  },

  getClassAssignments: async (req, res) => {
    const db =req.app.get('db');
    const {id, classid} = req.query
    let time = new Date();
    time = moment(time).format('YYYY-MM-DD')

    const assignments = await db.getAssignmentsByStudentId(id, classid, time)
    res.status(200).send(assignments)
  }
}