import React, { Component } from "react"
import "./dash.css"
import axios from "axios"
import { getLists } from "../../ducks/userReducer"
import { connect } from "react-redux"



class ActualEditInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popupVisible: false,
            editText: "",
            budget: "",
        }
    }
    handleClick = () => {
        if (!this.state.popupVisible) {
            document.addEventListener("click", this.handleOutsideClick, false)
        } else {
            document.removeEventListener(
                "click",
                this.handleOutsideClick,
                false,
            )
        }

        this.setState((prevState) => ({
            popupVisible: !prevState.popupVisible,
        }))
    }

    handleOutsideClick = (e) => {
        if (this.node.contains(e.target)) {
            return
        }

        this.handleClick()
    }

    handleEdit = async (id) => {
        let { editText } = this.state
        await axios
            .put(`/api/list-item/${id}`, { list_item_name: editText })
            .catch((err) => console.log("edit error", err))
        this.handleClick()
        this.props.update()
    }

    editBudget = async (id) => {
        let { budget } = this.state
        await axios
            .put(`/api/budget/${id}`, { budget: budget })
            .catch((err) => console.log("budget error", err))
        this.handleClick()
        this.props.update()
    }

    keyPress = (event) => {
        if (event.key === 13) {
            this.handleEdit(this.props.e.list_item_id[this.props.i])
        }
    }

    render() {
        let { popupVisible } = this.state
        let { e, i } = this.props
        return (
            <div
                className="popover-container"
                ref={(node) => {
                    this.node = node
                }}
            >
                <button className="delete-list" onClick={this.handleClick}>
                    <i className="fas fa-bars list-bars" />
                </button>
                {popupVisible && (
                    <div className="outer-box">
                        <div
                            className={
                                popupVisible
                                    ? "edit-list"
                                    : "edit-list edit-gone"
                            }
                        >
                            <textarea
                                onKeyPress={this.keyPress}
                                autoFocus="autofocus"
                                placeholder="Edit Card Name"
                                type="textarea"
                                onChange={(e) =>
                                    this.setState({ editText: e.target.value })
                                }
                            />
                            <input
                                placeholder="Edit Item Cost"
                                className="input-edit"
                                type="number"
                                onChange={(e) =>
                                    this.setState({ budget: e.target.value })
                                }
                            />
                        </div>
                        <div className="buttons">
                            <button>
                                <i className="far fa-clock" />
                                {` Add Reminder`}
                            </button>
                            <button
                                onClick={() => {
                                    this.props.deleteListItem(
                                        e.list_item_id[i],
                                    )
                                    this.handleClick()
                                }}
                            >
                                <i className="far fa-trash-alt" />
                                {`       Delete`}
                            </button>
                            <button
                                onClick={() =>
                                    this.handleEdit(
                                        e.list_item_id[i],
                                    )
                                }
                            >
                                <i className="far fa-edit" />
                                {` Edit Name`}
                            </button>
                            <button
                            onClick={() =>
                                    this.editBudget(
                                        e.list_item_id[i],
                                    )
                                }
                            >
                                <i className="fas fa-dollar-sign" />
                                {`  Edit Cost`}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
const mapState = (state) => state

export default connect(
    mapState,
    { getLists },
)(ActualEditInput)
