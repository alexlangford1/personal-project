import React, { Component } from "react"
import { connect } from "react-redux"
import "./vacation.css"
// import axios from "axios"
import { getVacay, getData } from "./../../ducks/userReducer"
import Header from "../header/Header"
import { Link } from "react-router-dom"

class Vacation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vacations: [],
            newVaca: false,
            vacayCheck: false,
        }
    }

    componentDidMount = async () => {
        await this.props.getData()
        await this.props.getVacay()
        this.setState({ vacations: this.props.vacation })
        console.log(this.props.vacation)
        if (!this.props.vacation[0]) {
            this.setState({ vacayCheck: false })
        } else {
            this.setState({ vacayCheck: true })
        }
    }

    handleClick = () => {
        this.setState({ vacations: !this.state.vacations })
    }

    render() {
        const { vacations, vacayCheck } = this.state
        let vacay = vacations.map((e) => (
            <h2 key={e.vacation_id} className="vacay-map">
                <i className="fas fa-pencil-alt fa-xs edit" />
                <Link
                    to={{
                        pathname: `/dashboard/${e.vacation_id}`
                    }}
                >
                    <div className="wordz">
                        {e.vacation_name}
                    </div>
                </Link>
            </h2>
        ))

        return (
            <div className="vacation">
                <Header />
                <h1 className="qwe">Vacations</h1>
                {vacayCheck ? (
                    <div className="vacay-boxes">{vacay}</div>
                ) : (
                    <h3>You have no vacations</h3>
                )}
            </div>
        )
    }
}
const mapState = (state) => state

export default connect(
    mapState,
    { getVacay, getData },
)(Vacation)
