import React, { Component } from "react"
import "./settings.css"
import { connect } from "react-redux"
import Unsplash from "./Unsplash"

class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menu: true,
        }
    }

    render() {
        let { menu } = this.state

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
                    <div onClick={() => this.setState({ menu: false })}>
                        Change Background
                    </div>

                    <a href="http://localhost:7777/logout">
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
                <div className='image'>
                    <Unsplash 
                    settingClick={this.props.settingClick}
                    vacation_id={this.props.vacation_id}
                    background={this.props.background}/>
                </div>
            </div>
        )
    }
}
const mapState = (state) => state

export default connect(mapState)(Settings)
