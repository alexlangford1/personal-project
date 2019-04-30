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
        const account = await db
            .get_acc_by_email([email])
            .catch((err) => console.log(err))
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
        else res.status(401).send("Please log in")
    },

    addVacation: async (req, res) => {
        const { vacation_name } = req.body
        const { id } = req.session.user
        const db = req.app.get("db")
        const newVacation = await db.create_vacation([vacation_name, id])
        res.status(200).send(newVacation)
    },
    addList: async (req, res) => {
        const { list_name } = req.body
        const { id } = req.params
        const db = req.app.get("db")
        const newList = await db.create_list([list_name, id])
        res.status(200).send(newList)
    },

    getVacation: async (req, res) => {
        const db = req.app.get("db")
        const { id } = req.session.user
        const allVacations = await db
            .get_vacation(id)
            .catch((err) => console.log(444444, err))
        res.status(200).send(allVacations)
    },
    getLists: async (req, res) => {
        const { vacation_id } = req.params
        const db = req.app.get("db")
        const lists = await db
            .get_lists([vacation_id])
            .catch((err) => console.log(665656, err))
        res.status(200).send(lists)
    },

    addListItem: async (req, res) => {
        const { list_item_name } = req.body
        const { id } = req.params
        const db = req.app.get("db")
        const newListItem = await db.create_list_item([id, list_item_name])
        res.status(200).send(newListItem)
    },
    deleteListItem: async (req, res) => {
        const { id } = req.params
        const db = req.app.get("db")
        await db.delete_list_item([id])
        res.status(200).send("item deleted")
    },

    deleteVacation: async (req, res) => {
        const { id } = req.params
        const db = req.app.get("db")
        await db.delete_vacation([id]).catch((err) => console.log(777, err))
        res.status(200).send("vacation deleted")
    },

    deleteList: async (req, res) => {
        const { id } = req.params
        const db = req.app.get("db")
        await db
            .delete_list([id])
            .catch((err) => console.log("delete list", err))
        res.status(200).send("list deleted")
    },

    editListItem: async (req, res) => {
        const { list_item_name } = req.body
        const { id } = req.params
        const db = req.app.get("db")
        const editListItem = await db.edit_list_item([id, list_item_name])
        res.status(200).send(editListItem)
    },

    editTotalBudget: async (req, res) => {
        const { total_budget } = req.body
        const { id } = req.params
        const db = req.app.get("db")
        const totalBudget = await db.edit_total_budget([id, total_budget])
        res.status(200).send(totalBudget)
    },

    editVacation: async (req, res) => {
        const { vacation_name } = req.body
        const { id } = req.params
        const db = req.app.get("db")
        const editVacation = await db.edit_vacation([id, vacation_name])
        res.status(200).send(editVacation)
    },

    budget: async (req, res) => {
        const { id } = req.params
        const { budget } = req.body
        const db = req.app.get("db")
        const newBudget = await db.edit_budget([id, budget])
        res.status(200).send(newBudget)
    },

    getVacayId: async (req, res) => {
        const { id } = req.params
        let vacation = await req.app
            .get("db")
            .get_vacation_by_id([id])
            .catch((err) => console.log("vacation get error", err))
        res.status(200).send(vacation)
    },

    getBudget: async (req, res) => {
        const { id } = req.params
        let budget = await req.app
            .get("db")
            .get_budget([id])
            .catch((err) => console.log("budget get error", err))
        res.status(200).send(budget)
    },

    getTotalBudget: async (req, res) => {
        const { id } = req.params
        let budget = await req.app
            .get("db")
            .get_total_budget([id])
            .catch((err) => console.log("budget get error", err))
        res.status(200).send(budget)
    },

    checked: async (req, res) => {
        const { id } = req.params
        let checked = await req.app
            .get("db")
            .get_checked([id])
            .catch((err) => console.log("checked", err))
        res.status(200).send(checked)
    },

    checkedOne: async (req, res) => {
        const { id } = req.params
        const { checked1 } = req.body
        let checked = await req.app
            .get("db")
            .edit_checked1([id, checked1])
            .catch((err) => console.log("checked1", err))
        res.status(200).send(checked)
    },

    checkedTwo: async (req, res) => {
        const { id } = req.params
        const { checked2 } = req.body
        let checked = await req.app
            .get("db")
            .edit_checked2([id, checked2])
            .catch((err) => console.log("checked2", err))
        res.status(200).send(checked)
    },

    checkedThree: async (req, res) => {
        const { id } = req.params
        const { checked3 } = req.body
        let checked = await req.app
            .get("db")
            .edit_checked3([id, checked3])
            .catch((err) => console.log("checked3", err))
        res.status(200).send(checked)
    },

    checkedFour: async (req, res) => {
        const { id } = req.params
        const { checked4 } = req.body
        let checked = await req.app
            .get("db")
            .edit_checked4([id, checked4])
            .catch((err) => console.log("checked4", err))
        res.status(200).send(checked)
    },
}
