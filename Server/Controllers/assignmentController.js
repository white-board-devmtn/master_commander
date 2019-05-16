module.exports = {
  getAssignments: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const assignments = await db.getAssignmentByUserId([id])
    res.status(200).send(assignments)
  }
}