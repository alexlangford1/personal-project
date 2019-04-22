import React, { Component } from "react"
import "./welcome.css"
// import { Link } from "react-router-dom"
import axios from "axios"

export default class SingIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            pass: "",
            toggle: true,
        }
    }

    login = async () => {
        const { email, pass } = this.state
        const res = await axios.post("/auth/login", { email, pass })
        if (res.data.loggedIn) this.props.history.push("/vacations")
        else alert("Login failed")
    }

    render() {
        let { toggle } = this.state
        return (
            <div>
                <div className="logow" />

                <div
                    className={
                        toggle ? "container" : "container right-panel-active"
                    }
                >
                    <div className="form-container sign-up-container">
                        <form action="localhost:3000/#/">
                            <h1>Create Account</h1>
                            <div className="social-container">
                                
                                <a href="localhost:3000/#/" className="social">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="localhost:3000/#/" className="social">
                                    <i className="fab fa-google-plus-g" />
                                </a>
                                <a href="localhost:3000/#/" className="social">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="localhost:3000/#/">
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="localhost:3000/#/" className="social">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="localhost:3000/#/" className="social">
                                    <i className="fab fa-google-plus-g" />
                                </a>
                                <a href="localhost:3000/#/" className="social">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                            <span>or use your account</span>
                            <input
                                type="text"
                                placeholder="Email"
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                                value={this.state.email}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    this.setState({ pass: e.target.value })
                                }
                                value={this.state.pass}
                            />
                            <a href="localhost:3000/#/">Forgot your password?</a>
                            <button onClick={() => this.login()}>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>
                                    To keep connected with us please login with
                                    your personal info
                                </p>
                                <button
                                    className="ghost"
                                    onClick={() =>
                                        this.setState({ toggle: true })
                                    }
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>
                                    Enter your personal details and start
                                    journey with us
                                </p>
                                <button
                                    className="ghost"
                                    onClick={() =>
                                        this.setState({ toggle: false })
                                    }
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
