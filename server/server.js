require("dotenv").config()
const express = require("express")
const massive = require("massive")
const session = require("express-session")
const ctrl = require("./controller")

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

massive(CONNECTION_STRING).then((db) => {
    app.set("db", db)
    console.log("We Chillin")
    // console.log(db.listTables())
})

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
app.get('/api/list/:vacation_id', ctrl.getLists)
app.get('/api/vacation', ctrl.getVacation)


app.post("/auth/register", ctrl.register)
app.post("/auth/login", ctrl.login)
app.post("/api/vacation", ctrl.addVacation)
app.post("/api/list/:id", ctrl.addList)
app.post("/api/list-item/:id", ctrl.addListItem)


app.put('/api/budget/:id', ctrl.budget)
app.put('/api/list-item/:id', ctrl.editListItem)
app.put('/api/vacation/:id', ctrl.editVacation)

app.delete('/api/list-item/:id', ctrl.deleteListItem)
app.delete('/api/vacation/:id', ctrl.deleteVacation)
app.delete('/api/list/:id', ctrl.deleteList)

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("http://localhost:3000/#/")
})

app.listen(SERVER_PORT, () => {
    console.log(`Bruhhh ${SERVER_PORT}`)
})
