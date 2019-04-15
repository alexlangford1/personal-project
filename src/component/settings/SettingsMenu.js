import React, { Component } from "react"
import "./settings.css"
import { connect } from "react-redux"


class Settings extends Component {
    render() {
        return (
            <div className="settings">
                <h1>Settings</h1>
                <a href="http://localhost:7777/logout">
                    <button>Logout</button>
                </a>
            </div>
        )
    }
}
const mapState = (state) => state

export default connect( mapState )(Settings)