module.exports = {
  getClassList: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.query;

    const classes = db.getClassesByUserID(id)
    res.status(200).send(classes);
  }
}