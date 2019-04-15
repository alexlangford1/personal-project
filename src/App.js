import React, { Component } from "react"
import "./App.css"
import { HashRouter, Switch, Route } from "react-router-dom"
import Dashboard from "./component/dash/Dashboard"
import Welcome from "./component/welcome/Welcome"
import Register from './component/register/Register'

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </HashRouter>
        )
    }
}
