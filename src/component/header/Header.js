import React, { Component } from "react"
import "./header.css"
import { connect } from "react-redux"
import { getData } from "./../../ducks/userReducer"
import { Link } from "react-router-dom"
import axios from "axios"

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newVaca: false,
            vacationName: "",
        }
    }

    componentDidMount() {
        this.props.getData()
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
        const { newVaca } = this.state
        return (
            <div className="app">
                <Link to="/vacations">
                    <i className="fas fa-bars fa-2x nope" />
                </Link>
                <h1>Cool App</h1>
                <div className="icons">
                    <i className="fas fa-plus " onClick={this.newClick} />
                    <i className="fas fa-bell " />
                    <i
                        className="fas fa-cog "
                        onClick={this.props.settingClick}
                    />
                </div>
                <div className={newVaca ? "drop-down" : "drop-down drop-gone"}>
                    <form>
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
    { getData },
)(Header)
