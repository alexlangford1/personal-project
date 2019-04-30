import React, { Component } from "react"
import "./dash.css"
import ActualEditInput from "./ActualEditInput"


export default class ListInput extends Component {
    constructor(props) {
        super(props)

        this.state = { editList: false }
    }
    render() {
        let { e } = this.props
        let budgets = e.budget.map((bud, i) => {
            if (bud) {
                return <div>${bud}</div>
            } else {
                return null
            }
        })
        let lists = e.list_text.map((list, i) => {
            if (list) {
                return (
                    <div key={e.list_item_id[i]} className="list-item">
                        <ActualEditInput
                            e={e}
                            i={i}
                            deleteListItem={this.props.deleteListItem}
                            update={this.props.update}
                        />
                        <div className="budget">{budgets[i]}</div>
                        {list}
                    </div>
                )
            }
            return list
        })

        return <div className="list---">{lists}</div>
    }
}
