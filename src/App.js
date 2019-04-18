import React, { Component } from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import Dashboard from "./component/dash/Dashboard"
import Welcome from "./component/welcome/Welcome"
import Register from './component/register/Register'
import Vacation from './component/vacation/vacationMenu'

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/dashboard/:vacation_id" component={Dashboard} />
                    <Route path="/register" component={Register} />
                    <Route path="/vacations" component={Vacation} />
                </Switch>
            </HashRouter>
        )
    }
}
