import React, { Component } from "react"
import "./register.css"
import axios from "axios"

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
        }
    }

    register = async () => {
        const { email, first_name, last_name, password } = this.state
        const res = await axios.post("/auth/register", {
            email,
            first_name,
            last_name,
            password,
        })
        if (res.data.loggedIn) this.props.history.push("/dashboard")
        else alert("Registration failed")
    }

    render() {
        return (
            <div className="welcome">
                <h1>Sign Up</h1>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    value={this.state.email}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={(e) =>
                        this.setState({ first_name: e.target.value })
                    }
                    value={this.state.first_name}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) =>
                        this.setState({ last_name: e.target.value })
                    }
                    value={this.state.last_name}
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={(e) =>
                        this.setState({ password: e.target.value })
                    }
                    value={this.state.password}
                />
                <button onClick={() => this.register()}>Register</button>
            </div>
        )
    }
}
