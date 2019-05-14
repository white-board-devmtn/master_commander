module.exports = {

  getEventsByID: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.query;

    const events = await db.getEventsByUserID(id);
    res.status(200).send(events);
  },
  addEvent: async (req, res) => {
    const db = req.app.get('db');
    const {eventTitle, startDate, endDate} = req.body;
    const { id } = req.session.user;

    await db.addEvent(id, eventTitle, startDate, endDate);
    const events = await db.getEventsByUserID(id);
    res.status(200).send(events);
  }
}