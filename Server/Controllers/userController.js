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
  },

  getForumPosts: async (req, res) => {
    const db = req.app.get('db');
    const {classid} = req.query

    const forums = await db.getForumByClassID(classid);
    res.status(200).send(forums);
  },
  addForumPost: async (req, res) => {
    const db = req.app.get('db');
    const {id, classid, post} = req.body;
    let time = new Date();
    time = moment(time).format('YYYY-MM-DD hh:mm:ss')

    await db.addForumPost(id, classid, post, time);
    const forums = await db.getForumByClassID(classid);
    res.status(200).send(forums);
  },
  getAnnouncements: async (req, res) => {
    const db = req.app.get('db');
    const {classid} = req.query;

    const announcements = await db.getAnnouncementsByClass(classid);
    res.status(200).send(announcements);

  },getGradesById: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const grades = await db.getGradesForClassByStudentID(id);
    res.status(200).send(grades);
  }
}
