import React, { Component } from "react"
// import List from "../lists/Lists"
import Header from "../header/Header"
import Settings from "../settings/SettingsMenu"
// import PopList from "../popuplist/PopUpList"
import "./dash.css"
import { getData, getLists } from "./../../ducks/userReducer"
import { connect } from "react-redux"
import axios from "axios"
import Input from "./Input"
import ListInput from "./ListInput"

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
        }
    }
    componentDidMount = async () => {
        await this.props.getData()
        this.update()
        
    }
    update = async () => {
        const { vacation_id } = this.props.match.params
        await this.props.getLists(vacation_id)
        this.setState({
            listName: this.props.lists,
        })
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
    updateInput = (e) => {
        this.setState({ listItem: e })
    }
    render() {
        const { settingMenu, listName } = this.state
        let mappedLists = listName.map((e) => (
            <div key={e.list_id} className="mapped-list">
                <div className="list-title">{e.list_name}</div>

                <ListInput
                    e={e}
                    deleteListItem={this.deleteListItem}
                    update={this.update}
                />
                <div className="lists-inputs">
                    <Input
                        updateInput={this.updateInput}
                        e={e}
                        newListItem={this.newListItem}
                    />
                </div>
            </div>
        ))
        return (
            <div className="body">
                <Header
                    settingClick={this.settingClick}
                    barsClick={this.barsClick}
                />
                {mappedLists}
                <div className="add-list">
                    <input
                        className=""
                        type="text"
                        value={this.state.listNameState}
                        onChange={(e) =>
                            this.setState({ listNameState: e.target.value })
                        }
                    />
                    <button onClick={() => this.newList()}>Add new list</button>
                </div>

                {/* <div className={popUpList ? "popUp" : "popdown"}>
                    <PopList click={this.handleClick} />
                </div> */}
                <div className={settingMenu ? "menu" : "menu gone"}>
                    <Settings />
                </div>
            </div>
        )
    }
}
const mapState = (state) => state

export default connect(
    mapState,
    { getData, getLists },
)(Dashboard)
