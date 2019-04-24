import React, { Component } from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import Dashboard from "./component/dash/Dashboard"
import Vacation from './component/vacation/vacationMenu'
import SignIn from './component/welcome/sign-in'
import Joke from './component/lists/Lists'

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/dashboard/:vacation_id" component={Dashboard} />
                    <Route path="/vacations" component={Vacation} />
                    <Route path="/hahalol" component={Joke} />
                </Switch>
            </HashRouter>
        )
    }
}
