import React, { Component } from "react"
import "./App.css"
import { HashRouter, Switch, Route } from "react-router-dom"
import Dashboard from "./component/dash/Dashboard"
import Welcome from "./component/welcome/Welcome"

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </HashRouter>
        )
    }
}
