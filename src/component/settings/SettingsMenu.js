import React, { Component } from "react"
import axios from "axios"
import "./settings.css"
import { connect } from "react-redux"
import Unsplash from "./Unsplash"
import Checkbox from "./CheckBox"
import { checked, getData } from "./../../ducks/userReducer"
import styled from "styled-components"
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
                                <CheckInput
                                    value={totalBudget}
                                    placeholder="Total Budget"
                                    onChange={(e) =>
                                        this.setState({
                                            totalBudget: e.target.value,
                                        })
                                    }
                                    type="text"
                                />
                            </div>
                            <SettingsButton
                                onClick={() => this.editBudget()}
                                className="logout"
                            >
                                Add budget
                            </SettingsButton>
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
                            <CheckBoxDiv>
                                <CheckLabel onClick={() => this.click1()}>
                                    <Checkbox
                                        checked={checked1}
                                        onChange={this.handleCheckboxChange}
                                    />
                                    <Span>Vacation Name</Span>
                                </CheckLabel>
                                <CheckLabel onClick={() => this.click2()}>
                                    <Checkbox
                                        checked={this.state.checked2}
                                        onChange={this.handleCheckboxChange1}
                                    />
                                    <Span>Total Budget</Span>
                                </CheckLabel>
                                <CheckLabel onClick={() => this.click3()}>
                                    <Checkbox
                                        checked={this.state.checked3}
                                        onChange={this.handleCheckboxChange2}
                                    />
                                    <Span>Planned Expenses</Span>
                                </CheckLabel>
                                <CheckLabel onClick={() => this.click4()}>
                                    <Checkbox
                                        checked={this.state.checked4}
                                        onChange={this.handleCheckboxChange3}
                                    />
                                    <Span>Amount Remaining</Span>
                                </CheckLabel>
                            </CheckBoxDiv>
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
                        <SettingsButton className="logout">
                            Logout
                        </SettingsButton>
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

const CheckBoxDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    
`

const CheckLabel = styled.label`
    margin-bottom: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.25s smooth;
    ${Span}:hover {
        transform: scale(1.015);
    }
`

const CheckInput = styled.input`
    width: 160px;
    height: 30px;
    font-size: 1rem;
    height: 35px;
`
const SettingsButton = styled.button`
    border: none;
    background: #f5f6f7;
    padding: 7px;
    border-radius: 5px;
    box-shadow: 0px 2px 3px rgb(129, 129, 141);
    outline: none;
    font-size: 1.1rem;
`

const Span = styled.span`
    font-size: 1.2rem;
`

