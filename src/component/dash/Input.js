import React, { Component } from "react"
import "./dash.css"

export default class Input extends Component {
    constructor(props) {
        super(props)

        this.state = { list: "" }
    }
    render() {
        return (
            <div className="lists-input">
                <input
                    value={this.state.list}
                    type="text"
                    placeholder="Add new card"
                    onChange={(e) => {
                        this.props.updateInput(e.target.value)
                        this.setState({ list: e.target.value })
                    }}
                />
                <button
                    onClick={() => {
                        this.props.newListItem(this.props.e.list_id)
                        this.setState({ list: "" })
                    }}
                >
                    Add card
                </button>
            </div>
        )
    }
}
