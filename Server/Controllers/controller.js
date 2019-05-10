const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body;
        const result = await db.get_user_by_email([email])
        const userData = result[0]
        if(!userData) {
            return res.status(401).send('Invalid Email')
        }
        const compare = bcrypt.compareSync(password, userData.hash);
        if(!compare) {
            return res.status(401).send('Incorrect Password')
        }
        req.session.user = {
            message: 'Login Successful',
            userData: userData,
            loggedIn: true
        }
        res.status(200).send(req.session.user)
    }
}