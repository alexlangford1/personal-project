import React, { Component } from "react"
import axios from "axios"
import "./settings.css"
import { connect } from "react-redux"
import Unsplash from "./Unsplash"
import Checkbox from "./CheckBox"
import { checked, getData } from "./../../ducks/userReducer"
require("dotenv").config()

class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menu: true,
            totalBudget: "",
            toggle: false,
            checkBox: false,
            checked1: true,
            checked2: true,
            checked3: true,
            checked4: true,
        }
    }

    componentDidMount = async () => {
        this.check()
    }

    check = async () => {
        await this.props.getData()
        const { id } = this.props.user
        await this.props.checked(id)
        let check1 = this.props.check[0].checked1
        let check2 = this.props.check[0].checked2
        let check3 = this.props.check[0].checked3
        let check4 = this.props.check[0].checked4
        this.setState({
            checked1: check1,
            checked2: check2,
            checked3: check3,
            checked4: check4,
        })
    }

    click1 = async () => {
        const { id } = this.props.user
        let { checked1 } = this.state
        let check = !checked1
        await axios
            .put(`/api/checkedone/${id}`, { checked1: check })
            .catch((err) => console.log(err))
        this.check()
        this.props.getCheck()
    }
    click2 = async () => {
        const { id } = this.props.user
        let { checked2 } = this.state
        let check = !checked2
        await axios.put(`/api/checkedtwo/${id}`, { checked2: check })
        this.check()
        this.props.getCheck()
    }
    click3 = async () => {
        const { id } = this.props.user
        let { checked3 } = this.state
        let check = !checked3
        await axios.put(`/api/checkedthree/${id}`, { checked3: check })
        this.check()
        this.props.getCheck()
    }
    click4 = async () => {
        const { id } = this.props.user
        let { checked4 } = this.state
        let check = !checked4
        await axios.put(`/api/checkedfour/${id}`, { checked4: check })
        this.check()
        this.props.getCheck()
    }

    checkBoxToggle = () => {
        this.setState({ checkBox: !this.state.checkBox, toggle: false })
    }

    // handleCheckboxChange = (event) =>
    //     this.setState({ checked: event.target.checked })

    // handleCheckboxChange1 = (event) =>
    //     this.setState({ checked1: event.target.checked })

    // handleCheckboxChange2 = (event) =>
    //     this.setState({ checked2: event.target.checked })

    // handleCheckboxChange3 = (event) =>
    //     this.setState({ checked3: event.target.checked })

    editBudget = async () => {
        let { totalBudget } = this.state
        let { vacation_id } = this.props
        let id = vacation_id
        await axios
            .put(`/api/totalbudget/${id}`, { total_budget: totalBudget })
            .catch((err) => console.log("add budget err", err))
        this.setState({ totalBudget: "", toggle: false })
        this.props.getTotalBudget()
    }

    render() {
        let { menu, toggle, totalBudget, checkBox, checked1 } = this.state

        return menu ? (
            <div className="settings">
                <div className="menu-title">
                    <div />
                    Menu
                    <i
                        className="fas fa-times"
                        onClick={() => this.props.settingClick()}
                    />
                </div>
                <div className="space-between">
                    <div>
                        <div
                            className="change-background"
                            onClick={() => this.setState({ menu: false })}
                        >
                            Change Background
                        </div>
                        <div
                            onClick={() =>
                                this.setState({
                                    toggle: !this.state.toggle,
                                    checkBox: false,
                                })
                            }
                            className="change-budget"
                        >
                            Edit Vacation Budget
                        </div>
                        <div
                            className={
                                toggle ? "edit-budget" : "edit-budget close"
                            }
                        >
                            <div>
                                <input
                                    value={totalBudget}
                                    className="budget-input"
                                    placeholder="Total Budget"
                                    onChange={(e) =>
                                        this.setState({
                                            totalBudget: e.target.value,
                                        })
                                    }
                                    type="text"
                                />
                            </div>
                            <button
                                onClick={() => this.editBudget()}
                                className="logout"
                            >
                                Add budget
                            </button>
                        </div>
                        <div
                            onClick={() => this.checkBoxToggle()}
                            className="change-background budget-display"
                        >
                            Budget Displays
                        </div>
                        <div
                            className={
                                checkBox ? "check-box" : "check-box close"
                            }
                        >
                            <div className="check-box2">
                                <label onClick={() => this.click1()}>
                                    <Checkbox
                                        checked={checked1}
                                        onChange={this.handleCheckboxChange}
                                    />
                                    <span>Vacation Name</span>
                                </label>
                                <label onClick={() => this.click2()}>
                                    <Checkbox
                                        checked={this.state.checked2}
                                        onChange={this.handleCheckboxChange1}
                                    />
                                    <span>Total Budget</span>
                                </label>
                                <label onClick={() => this.click3()}>
                                    <Checkbox
                                        checked={this.state.checked3}
                                        onChange={this.handleCheckboxChange2}
                                    />
                                    <span>Planned Expenses</span>
                                </label>
                                <label onClick={() => this.click4()}>
                                    <Checkbox
                                        checked={this.state.checked4}
                                        onChange={this.handleCheckboxChange3}
                                    />
                                    <span>Amount Remaining</span>
                                </label>
                            </div>
                        </div>
                        <div className="display-none">
                            <div className="title-display">
                                {this.props.vacationListName} Vacation!
                            </div>
                            <div className="title-display">
                                Total Budget: ${this.props.totalBudget1}
                            </div>
                            <div className="title-display">
                                Planned Expenses: ${this.props.budget1}
                            </div>
                            <div>Amount Remaining: ${this.props.remainder}</div>
                        </div>
                    </div>
                    <a href={process.env.REACT_APP_LOGOUT}>
                        <button className="logout">Logout</button>
                    </a>
                </div>
            </div>
        ) : (
            <div className="background">
                <div className="menu-title">
                    <i
                        className="fas fa-arrow-left"
                        onClick={() => this.setState({ menu: true })}
                    />
                    Change Background
                    <i
                        className="fas fa-times"
                        onClick={() => this.props.settingClick()}
                    />
                </div>
                <div className="image">
                    <Unsplash
                        settingClick={this.props.settingClick}
                        vacation_id={this.props.vacation_id}
                        background={this.props.background}
                    />
                </div>
            </div>
        )
    }
}
const mapState = (state) => state

export default connect(
    mapState,
    { checked, getData },
)(Settings)
