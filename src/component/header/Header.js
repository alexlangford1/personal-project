import React, { Component } from "react"
import "./header.css"
import { connect } from "react-redux"
import { getData, getVacay } from "./../../ducks/userReducer"
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

    async componentDidMount() {
        await this.props.getData()
    }
    addVacation = async () => {
        const { vacationName } = this.state
        console.log(vacationName)
        await axios.post("/api/vacation", {
            vacation_name: vacationName,
        })
        this.setState({ vacationName: "" })
        this.newClick()
    }
    newClick = () => {
        this.setState({ newVaca: !this.state.newVaca })
    }

    render() {
        const { newVaca, vacayMenu } = this.state
        return (
            <div className="app">
                <div className="search">
                    <i
                        className="fas fa-bars fa-2x nope"
                        onClick={() =>
                            this.setState({ vacayMenu: !this.state.vacayMenu })
                        }
                    />
                    <div className={vacayMenu ? "menu-down" : "menu-down up"}>
                        <div className="vacation-hover">
                            <Link
                                style={{
                                    fontSize: "1.7rem",
                                    borderBottom: "none",
                                    textDecoration: "none",
                                    color: "#17394d",
                                }}
                                to="/vacations"
                            >
                                VACATIONS
                            </Link>
                        </div>
                        <div className="vacation-hover">
                            <Link
                                style={{
                                    fontSize: "1.7rem",
                                    borderBottom: "none",
                                    textDecoration: "none",
                                    color: "#17394d",
                                }}
                                to="/planner"
                            >
                                PLANNER
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="search-icon">
                    <input placeholder=" search" type="text" />
                    <span className="fas fa-search" />
                </div>

                <div className="logob" />

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
    { getData, getVacay },
)(Header)
