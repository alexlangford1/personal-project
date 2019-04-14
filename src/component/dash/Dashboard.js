import React, { Component } from "react"
import List from "../lists/Lists"
import Header from "../header/Header"
import Settings from "../settings/SettingsMenu"
import PopList from "../popuplist/PopUpList"
import "./dash.css"

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            popUpList: false,
        }
    }

    handleClick = () => {
        this.setState({ popUpList: !this.state.popUpList })
    }
    render() {
        const { popUpList } = this.state
        return (
            <div className="body" onClick={() => this.handleClick()}>
                <Header />
                <div className={popUpList ? "popUp" : "popdown"}>
                    <PopList click={this.handleClick} />
                </div>
                <div onClick={() => this.handleClick()}>
                    <List />
                </div>
                <Settings />
            </div>
        )
    }
}
