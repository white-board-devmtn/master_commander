module.exports = {

  getEventsByID: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.query;

    const events = await db.getEventsByUserID(id);
    res.status(200).send(events);
  },
  addEvent: async (req, res) => {
    const db = req.app.get('db');
    const {userID, eventDescription, eventTitle, startDate, endDate} = req.body;

    await db.addEvent(userID, eventDescription, eventTitle, startDate, endDate);
    const events = await db.getEventsByUserID(userID);
    res.status(200).send(events);
  }
}