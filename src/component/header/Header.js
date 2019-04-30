import React, { Component } from "react"
import "./header.css"
import { connect } from "react-redux"
import { getData, getVacayById, getBudget } from "./../../ducks/userReducer"
import { Link } from "react-router-dom"
import axios from "axios"

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newVaca: false,
            vacationName: "",
            vacayMenu: false,
        }
    }

    componentDidMount = async () => {
        await this.props.getData()
    }

    addVacation = async () => {
        const { vacationName } = this.state
        await axios.post(`/api/vacation`, {
            vacation_name: vacationName,
        })
        this.setState({ vacationName: "" })
        this.newClick()
    }
    newClick = () => {
        this.setState({ newVaca: !this.state.newVaca })
    }

    render() {
        const { newVaca } = this.state
        return (
            <div className="app">
                <div className="top-left">
                    <Link className="house" to="/vacations">
                        <i className="fas fa-home fa-2x nope" />
                    </Link>
                </div>
                <div className="logo1">
                    <div className="logob">
                        <Link to="/vacations">
                            <div className="wander" />
                        </Link>
                    </div>
                </div>

                <div className="icons">
                    <i className="fas fa-plus " onClick={this.newClick} />
                    <i className="fas fa-bell " />
                    <i
                        className="fas fa-cog "
                        onClick={this.props.settingClick}
                    />
                </div>
                <div className={newVaca ? "drop-down" : "drop-down drop-gone"}>
                    <h2 className="h2">Add New Vacation</h2>
                    <form className="cant-think">
                        <input
                            type="text"
                            placeholder="New Vacation"
                            required
                            onChange={(e) =>
                                this.setState({ vacationName: e.target.value })
                            }
                            value={this.state.vacationName}
                        />
                        <button
                            type="submit"
                            onClick={() => this.addVacation()}
                        >
                            Add
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapState = (state) => state

export default connect(
    mapState,
    { getData, getVacayById, getBudget },
)(Header)
