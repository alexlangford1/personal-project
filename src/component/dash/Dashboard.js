import React, { Component } from "react"
import List from "../lists/Lists"
import Header from "../header/Header"
import Settings from "../settings/SettingsMenu"
import PopList from "../popuplist/PopUpList"
import "./dash.css"
import { getData } from "./../../ducks/userReducer"
import { connect } from "react-redux"
import axios from "axios"

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popUpList: false,
            settingMenu: false,
            newVaca: false,
            vacationName: "",
        }
    }
    componentDidMount() {
        this.props.getData()
    }

    handleClick = () => {
        this.setState({ popUpList: !this.state.popUpList })
    }

    settingClick = () => {
        this.setState({ settingMenu: !this.state.settingMenu })
    }
    newClick = () => {
        this.setState({ newVaca: !this.state.newVaca })
    }

    addVacation = async () => {
        const { vacationName } = this.state
        console.log(vacationName)
        let res = await axios.post("/api/vacation", { vacation_name: vacationName, req.session.user })
        res.status(200).send(res.data)
    }

    render() {
        const { popUpList, settingMenu, newVaca } = this.state
        return (
            <div className="body">
                <Header
                    settingClick={this.settingClick}
                    newClick={this.newClick}
                />
                <h1> hello {this.props.user.first_name}</h1>
                <div className={popUpList ? "popUp" : "popdown"}>
                    <PopList click={this.handleClick} />
                </div>
                <div onClick={() => this.handleClick()}>
                    <List />
                </div>
                <div className={settingMenu ? "menu" : "popdown"}>
                    <Settings />
                </div>
                <div className={newVaca ? "drop-down" : "popdown"}>
                    <input
                        type="text"
                        placeholder="New Vacation"
                        onChange={(e) =>
                            this.setState({ vacationName: e.target.value })
                        }
                    />
                    <button onClick={() => this.addVacation()}>Add</button>
                </div>
            </div>
        )
    }
}
const mapState = (state) => state

export default connect(
    mapState,
    { getData },
)(Dashboard)
