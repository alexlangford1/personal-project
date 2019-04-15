import React, { Component } from "react"
import "./header.css"
import { connect } from "react-redux"
import { getData } from "./../../ducks/userReducer"

class Header extends Component {
    componentDidMount() {
        this.props.getData()
    }

    render() {
        return (
            <div className="app">
                <h1>{this.props.user.email}</h1>
                <h1>Cool App</h1>
                <div className='icons'>
                <i 
                className="fas fa-plus "
                onClick={this.props.newClick}
                ></i>
                    <i className="fas fa-bell " />
                    <i
                        className="fas fa-cog "
                        onClick={this.props.settingClick}
                    />
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
