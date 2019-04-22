import React, { Component } from "react"
import axios from "axios"

export default class EditList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle: false,
            vacation_name: "",
        }
    }

    editVacation = async (id) => {
        let { vacation_name } = this.state
        await axios
            .put(`/api/vacation/${id}`, { vacation_name })
            .catch((err) => console.log("edit vacation error", err))
        this.setState({
            vacation_name: "",
            toggle: false,
        })
        this.props.getVacations()
    }

    render() {
        let { toggle } = this.state
        return (
            <div className="flex">
                <i
                    onClick={() => this.setState({ toggle: !toggle })}
                    className="fas fa-pencil-alt fa-xs edit"
                />

                <div className={toggle ? "edit-modal" : "edit-modal dropped"}>
                    <i
                        className="fas fa-times move-x"
                        onClick={() => this.setState({ toggle: false })}
                    />
                    <div className="text-area">
                        <textarea
                            value={this.state.vacation_name}
                            onChange={(event) =>
                                this.setState({
                                    vacation_name: event.target.value,
                                })
                            }
                            type="text"
                        />
                    </div>
                    <div className="edit-buttons">
                        <button
                            onClick={() => {
                                this.editVacation(this.props.e.vacation_id)
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                this.props.deleteVacation(
                                    this.props.e.vacation_id,
                                )
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
