import React, { Component } from "react"
import "./dash.css"
import ActualEditInput from "./actualEditInput"

export default class ListInput extends Component {
    constructor(props) {
        super(props)

        this.state = { editList: false }
    }
    render() {
        if (this.props.e.list_text) {
            return (
                <div className="list---">
                    {this.props.e.list_text.map((list, i) => (
                        <div
                            key={this.props.e.list_item_id[i]}
                            className="list-item"
                        >
                            <ActualEditInput
                                e={this.props.e}
                                i={i}
                                deleteListItem={this.props.deleteListItem}
                                update={this.props.update}
                            />
                            {list}
                        </div>
                    ))}
                </div>
            )
        } else {
            return null
        }
    }
}
