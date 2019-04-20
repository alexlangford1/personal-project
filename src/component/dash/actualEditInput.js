import React, { Component } from "react"
import "./dash.css"
import axios from "axios"
import { getLists } from "./../../ducks/userReducer"
import { connect } from "react-redux"

class ActualEditInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popupVisible: false,
            editText: "",
        }
    }
    handleClick = () => {
        if (!this.state.popupVisible) {
            // attach/remove event handler
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
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return
        }

        this.handleClick()
    }

    handleEdit = (id) => {
        let { editText } = this.state
        console.log(id)
        axios
            .put(`/api/list-item/${id}`, { list_item_name: editText })
            .catch((err) => console.log("edit error", err))
        this.handleClick()
        this.props.update()
    }

    keyPress = (event) => {
        if (event.key === 13) {
            this.handleEdit(
                this.props.e.list_item_id[this.props.i],
            )
        }
      }

    render() {
        let { popupVisible } = this.state
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
                                placeholder="Edit Card"
                                type="textarea"
                                onChange={(e) =>
                                    this.setState({ editText: e.target.value })
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
                                        this.props.e.list_item_id[this.props.i],
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
                                        this.props.e.list_item_id[this.props.i],
                                    )
                                }
                            >
                                <i className="far fa-edit" />
                                {` Edit`}
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
