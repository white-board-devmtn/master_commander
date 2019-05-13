const bcrypt = require('bcryptjs');

module.exports = {

    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const result = await db.get_user_by_email({email})
        const userData = result[0]
        if(!userData) {
            return res.status(401).send('Invalid Email')
        }
        const compare = bcrypt.compareSync(password, userData.hash);
        if(!compare) {
            return res.status(401).send('Incorrect Password')
        }
        req.session.user = { 
            id: userData.user_id,
            firstName: userData.first_name,
            lastName: userData.last_name,
            email: userData.email,
            phoneNumber: userData.phone_number,
            img: userData.img,
            isTeacher: userData.is_teacher,
        }
        res.status(200).send({
            message: 'Login Successful',
            userData: req.session.user,
            loggedIn: true
        })
    }, 

    register: async (req, res) => {
        const db = req.app.get('db');
        const {firstName, lastName, email, password} = req.body;
        const result = await db.get_user_by_email({email});
        const userData = result[0]
        if (userData) {
            return res.status(401).send({ message: 'Email already in use' })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newResult = await db.create_user({firstName, lastName, email, hash});
        req.session.user = { 
            id: newResult[0].user_id,
            firstName: newResult[0].firstname,
            lastName: newResult[0].lastname,
            phoneNumber: newResult[0].phone_number,
            email: newResult[0].email,
            img: newResult[0].img,
            isTeacher: newResult[0].teacher,
        }
        res.status(200).send({
            message: 'Logged in',
            userData: req.session.user,
            loggedIn: true
        })
    },

    getUser: (req, res) => {
        if (req.session.user) res.status(200).send({userData: req.session.user})
        else res.status(401).send('Please log in');
    },
    logout: (req, res) => {
        delete req.session.user;
        res.status(200).send('logged out');
    }

}
