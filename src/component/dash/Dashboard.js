import React, { Component } from "react"
import Header from "../header/Header"
import Settings from "../settings/SettingsMenu"
import "./dash.css"
import {
    getData,
    getLists,
    getVacay,
    getVacayById,
    getBudget,
    getTotalBudget,
    checked,
} from "./../../ducks/userReducer"
import { connect } from "react-redux"
import axios from "axios"
import Input from "./Input"
import ListInput from "./ListInput"
import swal from 'sweetalert'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popUpList: false,
            settingMenu: false,
            lists: [],
            menu: false,
            listName: [],
            listNameState: "",
            listItem: "",
            addList: false,
            vacationListName: "",
            budget1: "",
            editTotalBudget: "",
            totalBudget: "",
            remainder: "",
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
        }
    }
    componentDidMount = async () => {
        this.background()
        await this.props.getData()
        this.update()
        const { vacation_id } = this.props.match.params
        await this.props.getData()
        if (vacation_id) {
            await this.props.getVacayById(vacation_id)
            let vacation = this.props.vacationID[0].vacation_name
            this.setState({ vacationListName: vacation })
        }
        let {newUser} = this.props.user
        if(newUser){
            swal('From here you can add lists to plan your vacation! Also try changing your vacation background or adding your vacation budget in settings:)')
        }
        this.budget()
        await this.getTotalBudget()
        this.getRemainder()
        this.getCheck()
    }

    getCheck = async () => {
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

    getRemainder = () => {
        let { budget1, totalBudget } = this.state
        let remainder = totalBudget - budget1
        this.setState({ remainder: remainder })
    }

    getTotalBudget = async () => {
        const { vacation_id } = this.props.match.params
        let id = vacation_id
        await this.props.getTotalBudget(id)
        let budget = this.props.totalBudget[0].total_budget
        await this.setState({ totalBudget: budget })
        this.getRemainder()
    }

    background = () => {
        const { vacation_id } = this.props.match.params
        this.setState({
            backImage: localStorage.getItem(`imageUrl${vacation_id}`),
        })
    }
    update = async () => {
        const { vacation_id } = this.props.match.params
        await this.props.getLists(vacation_id)
        this.setState({
            listName: this.props.lists,
        })
        this.budget()
    }

    handleClick = () => {
        this.setState({ popUpList: !this.state.popUpList })
    }

    settingClick = () => {
        this.setState({ settingMenu: !this.state.settingMenu })
    }

    getLists = async () => {
        await axios.get("/api/vacation")
    }

    barsClick = () => {
        this.setState({ menu: !this.state.menu })
    }

    newList = async () => {
        const { listNameState } = this.state
        const { vacation_id } = this.props.match.params
        await axios.post(`/api/list/${vacation_id}`, {
            list_name: listNameState,
        })
        this.setState({ listNameState: "" })
        await this.props.getLists(vacation_id)
        this.setState({
            listName: this.props.lists,
        })
    }

    newListItem = async (id) => {
        const { listItem } = this.state
        await axios.post(`/api/list-item/${id}`, {
            list_item_name: listItem,
        })
        this.setState({ listItem: "" })
        const { vacation_id } = this.props.match.params
        await this.props.getLists(vacation_id)
        this.setState({
            listName: this.props.lists,
        })
    }
    deleteListItem = async (id) => {
        await axios
            .delete(`/api/list-item/${id}`)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(99999999, err))
        const { vacation_id } = this.props.match.params
        await this.props.getLists(vacation_id)
        this.setState({
            listName: this.props.lists,
        })
    }

    deleteList = async (id) => {
        await axios
            .delete(`/api/list/${id}`)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log("list delete error", err))
        const { vacation_id } = this.props.match.params
        await this.props.getLists(vacation_id)
        this.setState({
            listName: this.props.lists,
        })
    }

    updateInput = (e) => {
        this.setState({ listItem: e })
    }

    budget = async () => {
        const { vacation_id } = this.props.match.params
        if (vacation_id) {
            await this.props.getBudget(vacation_id)
            let budgetSum = this.props.budget[0].sum
            await this.setState({ budget1: budgetSum })
            this.getRemainder()
        }
    }

    render() {
        const { vacation_id } = this.props.match.params
        const {
            settingMenu,
            listName,
            vacationListName,
            budget1,
            totalBudget,
            remainder,
            checked1,
            checked2,
            checked3,
            checked4,
        } = this.state
        let mappedLists = listName.map((e) => {
            let total = e.budget.reduce((acc, curr) => {
                return acc + curr
            }, 0)
            return (
                <div key={e.list_id} className="mapped-list">
                    <div className="list-title">
                        {e.list_name}
                        <i
                            className="fas fa-times delete-l"
                            onClick={() => this.deleteList(e.list_id)}
                        />
                    </div>

                    <ListInput
                        e={e}
                        deleteListItem={this.deleteListItem}
                        update={this.update}
                    />
                    <div className="lists-111">
                        <div className="total">Total: ${total}</div>
                        <Input
                            updateInput={this.updateInput}
                            e={e}
                            newListItem={this.newListItem}
                        />
                    </div>
                </div>
            )
        })
        let { backImage } = this.state
        return (
            <div
                className="body"
                style={{
                    backgroundImage: `url(
                        ${
                            backImage
                                ? backImage
                                : "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjYyNzQ3fQ"
                        })`,
                }}
            >
                <Header
                    list={listName}
                    vacation_id={vacation_id}
                    settingClick={this.settingClick}
                    barsClick={this.barsClick}
                />
                <div className="budget-vacay">
                    {vacationListName && checked1 ? (
                        <div className="title-display">
                            {vacationListName} Vacation!
                        </div>
                    ) : null}
                    {totalBudget && checked2 ? (
                        <div className="title-display">
                            Total Budget: ${totalBudget}
                        </div>
                    ) : null}
                    {budget1 && checked3 ? (
                        <div className="title-display">
                            Planned Expenses: ${budget1}
                        </div>
                    ) : null}
                    {remainder && checked4 ? (
                        <div>Amount Remaining: ${remainder}</div>
                    ) : null}
                </div>
                {mappedLists}
                <div className="add-list">
                    <input
                        placeholder='Add New List'
                        className=""
                        type="text"
                        value={this.state.listNameState}
                        onChange={(e) =>
                            this.setState({ listNameState: e.target.value })
                        }
                    />
                    <button onClick={() => this.newList()}>Add List</button>
                </div>
                <div className={settingMenu ? "menu" : "menu gone"}>
                    <Settings
                        totalBudget1={totalBudget}
                        budget1={budget1}
                        remainder={remainder}
                        vacationListName={vacationListName}
                        getCheck={this.getCheck}
                        getTotalBudget={this.getTotalBudget}
                        vacation_id={vacation_id}
                        background={this.background}
                        settingClick={this.settingClick}
                    />
                </div>
            </div>
        )
    }
}
const mapState = (state) => state

export default connect(
    mapState,
    {
        getData,
        getLists,
        getVacay,
        getVacayById,
        getBudget,
        getTotalBudget,
        checked,
    },
)(Dashboard)
