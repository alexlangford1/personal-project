require("dotenv").config()
const express = require("express")
const massive = require("massive")
const session = require("express-session")
const ctrl = require("./controller")

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    REACT_APP_REDIRECT,
} = process.env

const app = express()

massive(CONNECTION_STRING).then((db) => {
    app.set("db", db)
    console.log("We Chillin")
})

app.use(express.static(`${__dirname}/../build`))
app.use(express.json())

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 30,
        },
    }),
)

app.get("/auth/user-data", ctrl.userData)
app.get("/api/list/:vacation_id", ctrl.getLists)
app.get("/api/vacation", ctrl.getVacation)
app.get("/api/vacation-id/:id", ctrl.getVacayId)
app.get("/api/budget/:id", ctrl.getBudget)
app.get("/api/totalbudget/:id", ctrl.getTotalBudget)
app.get('/api/checked/:id', ctrl.checked)



app.post("/auth/register", ctrl.register)
app.post("/auth/login", ctrl.login)
app.post("/api/vacation", ctrl.addVacation)
app.post("/api/list/:id", ctrl.addList)
app.post("/api/list-item/:id", ctrl.addListItem)

app.put("/api/budget/:id", ctrl.budget)
app.put("/api/list-item/:id", ctrl.editListItem)
app.put("/api/vacation/:id", ctrl.editVacation)
app.put("/api/totalbudget/:id", ctrl.editTotalBudget)
app.put('/api/checkedone/:id', ctrl.checkedOne)
app.put('/api/checkedtwo/:id', ctrl.checkedTwo)
app.put('/api/checkedthree/:id', ctrl.checkedThree)
app.put('/api/checkedfour/:id', ctrl.checkedFour)

app.delete("/api/list-item/:id", ctrl.deleteListItem)
app.delete("/api/vacation/:id", ctrl.deleteVacation)
app.delete("/api/list/:id", ctrl.deleteList)

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect(`${REACT_APP_REDIRECT}`)
})

app.listen(SERVER_PORT, () => {
    console.log(`Bruhhh ${SERVER_PORT}`)
})
