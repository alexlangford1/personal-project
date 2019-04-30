import React, { Component } from "react"
import { connect } from "react-redux"
import "./vacation.css"
import { getVacay, getData } from "../../ducks/userReducer"
import Header from "../header/Header"
import { Link } from "react-router-dom"
import EditList from "./EditList"
import axios from "axios"

class Vacation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            vacations: [],
            newVaca: false,
            vacayCheck: false,
            toggle: false,
            vacation_name: "",
        }
    }

    getVacations = async () => {
        await this.props.getVacay()
        this.setState({ vacations: this.props.vacation })
    }

    deleteVacation = async (id) => {
        await axios
            .delete(`/api/vacation/${id}`)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(5656569, err))
        await this.props.getVacay()
        this.setState({
            vacations: this.props.vacation,
        })
    }

    componentDidMount = async () => {
        this.getVacation()
    }
    
    getVacation = async () => {
        await this.props.getData()
        await this.props.getVacay()
        this.setState({ vacations: this.props.vacation })
        if (!this.props.vacation[0]) {
            this.setState({ vacayCheck: false })
        } else {
            this.setState({ vacayCheck: true })
        }
    }

    handleClick = () => {
        this.setState({ vacations: !this.state.vacations })
    }
    handleToggle = () => {
        this.setState({ toggle: !this.state.toggle })
    }

    render() {
        const { vacations, vacayCheck, toggle } = this.state
        let vacay = vacations.map((e) => (
            <div
                key={e.vacation_id}
                style={{
                    backgroundImage: `url(
                        ${localStorage.getItem(`imageUrl${e.vacation_id}`) ||
                            "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjYyNzQ3fQ"})`,
                }}
                className="vacay-map"
            >
                <div className="link">
                    <Link
                        to={{
                            pathname: `/dashboard/${e.vacation_id}`,
                        }}
                        style={{
                            border: "none",
                            textDecoration: "none",
                        }}
                    >
                        <div className="wordz">{e.vacation_name}</div>
                    </Link>
                </div>

                <EditList
                    getVacations={this.getVacations}
                    editVacation={this.editVacation}
                    toggle={toggle}
                    e={e}
                    deleteVacation={this.deleteVacation}
                    update={this.update}
                />
            </div>
        ))

        return (
            <div className="vacation">
                <Header getVacation={this.getVacation} />
                <div className="empty" />
                {vacayCheck ? (
                    <div className="vacay-boxes">{vacay}</div>
                ) : (
                    <div className="blur">
                        <h1>Looking for your vacations,</h1>
                        <h1>Please add one to start.</h1>
                    </div>
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
