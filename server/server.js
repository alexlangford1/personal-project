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

app.post("/auth/register", ctrl.register)
app.post("/auth/login", ctrl.login)
app.get("/auth/user-data", ctrl.userData)
app.post("/api/vacation", ctrl.addVacation)
app.post("/api/list/:id", ctrl.addList)
app.post("/api/list-item/:id", ctrl.addListItem)
app.get('/api/list/:vacation_id', ctrl.getLists)
app.get('/api/vacation', ctrl.getVacation)
app.delete('/api/list-item/:id', ctrl.deleteListItem)
app.put('/api/list-item/:id', ctrl.editListItem)

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("http://localhost:3000/#/")
})

app.listen(SERVER_PORT, () => {
    console.log(`Bruhhh ${SERVER_PORT}`)
})
