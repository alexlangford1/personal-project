import React, { Component } from "react"
import "./welcome.css"
import { Link } from "react-router-dom"
import axios from "axios"

export default class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            pass: "",
        }
    }

    login = async () => {
        const { email, pass } = this.state
        const res = await axios.post("/auth/login", { email, pass })
        if (res.data.loggedIn) this.props.history.push("/dashboard")
        else alert("Login failed")
    }

    render() {
        return (
            <div className="welcome">
                <h1>Welcome</h1>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    value={this.state.email}
                    
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={(e) => this.setState({ pass: e.target.value })}
                    value={this.state.pass}
                />
                <button onClick={() => this.login()} >Login</button>
                <Link to="/register">Or Sign Up</Link>
            </div>
        )
    }
}
