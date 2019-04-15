const bcrypt = require("bcryptjs")

module.exports = {

    register: async (req, res) => {
        const { email, first_name, last_name, password } = req.body
        const db = req.app.get("db")
        const account = await db.get_acc_by_email([email])
        if (account[0]) {
            return res.status(200).send({ message: "Email already in use." })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let newAcc = await db.create_new_acc([
            email,
            first_name,
            last_name,
            hash,
        ])
        req.session.user = {
            id: newAcc[0].id,
            email: newAcc[0].email,
            first_name: newAcc[0].first_name,
            last_name: newAcc[0].last_name,
        }
        res.status(200).send({
            message: "logged in",
            userData: req.session.user,
            loggedIn: true,
        })
    },


    login: async (req, res) => {
        const { email, pass } = req.body
        const db = req.app.get("db")
        const account = await db.get_acc_by_email([email])
        if (account.length === 0) {
            return res.status(200).send({ message: "Account not found." })
        }
        const result = bcrypt.compareSync(pass, account[0].password)
        if (!result) {
            return res.status(401).send({ message: "Incorrect password." })
        }
        req.session.user = {
            id: account[0].id,
            email: account[0].email,
            first_name: account[0].first_name,
            last_name: account[0].last_name,
        }
        res.status(200).send({
            message: "Log in successful",
            loggedIn: true,
        })
    },

    userData(req, res) {
        if (req.session.user) res.status(200).send(req.session.user)
        else res.status(401).send('Please log in');
      },

      addVacation: async (req, res) => {
        const { vacation_name } = req.body
        const db = req.app.get("db")
        const newVacation = await db.create_vacation([vacation_name])
        res.status(200).send(newVacation)
      }
}
