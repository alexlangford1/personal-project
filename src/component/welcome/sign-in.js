import React, { Component } from "react"
import "./welcome.css"
import axios from "axios"
import { Link } from "react-router-dom"

export default class SingIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email2: "",
            first_name: "",
            last_name: "",
            password: "",
            email: "",
            pass: "",
            toggle: true,
        }
    }
    register = async () => {
        const { email2, first_name, last_name, password } = this.state
        const res = await axios.post("/auth/register", {
            email: email2,
            first_name,
            last_name,
            password,
        })
        if (res.data.loggedIn) this.props.history.push("/vacations")
        else alert("Registration failed")
    }

    login = async () => {
        const { email, pass } = this.state
        const res = await axios.post("/auth/login", { email, pass })
        if (res.data.loggedIn) this.props.history.push("/vacations")
        else alert("Login failed")
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value })
    }

    render() {
        let { toggle } = this.state
        return (
            <div className="size1">
                <div className="logo7">
                    <div className="logow" />
                </div>

                <div
                    className={
                        toggle ? "container" : "container right-panel-active"
                    }
                >
                    <div className="form-container sign-up-container">
                        <div className="forms-login login">
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <button  className="social">
                                    <i className="fab fa-facebook-f" />
                                </button>
                                <button  className="social">
                                    <i className="fab fa-google-plus-g" />
                                </button>
                                <button  className="social">
                                    <i className="fab fa-linkedin-in" />
                                </button>
                            </div>
                            <span className="none">
                                or use your email for registration
                            </span>
                            <input type="hidden" value="something" />
                            <input
                                autoComplete="off"
                                onChange={(e) =>
                                    this.handleChange(
                                        "first_name",
                                        e.target.value,
                                    )
                                }
                                name="first_name"
                                type=""
                                placeholder="First Name"
                            />
                            <input
                                autoComplete="off"
                                onChange={(e) =>
                                    this.handleChange(
                                        "last_name",
                                        e.target.value,
                                    )
                                }
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                            />
                            <input
                                required
                                autoComplete="off"
                                onChange={(e) =>
                                    this.handleChange("email2", e.target.value)
                                }
                                name="email2"
                                type="text"
                                placeholder="Email"
                            />
                            <input
                                required
                                autoComplete="off"
                                onChange={(e) =>
                                    this.handleChange(
                                        "password",
                                        e.target.value,
                                    )
                                }
                                name="password"
                                type="new-password"
                                placeholder="Password"
                            />
                            <button onClick={() => this.register()}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                    <div className="form-container sign-in-container">
                        <div className="forms-login">
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <button className="social">
                                    <i className="fab fa-facebook-f" />
                                </button>
                                <button  className="social">
                                    <i className="fab fa-google-plus-g" />
                                </button>
                                <button  className="social">
                                    <i className="fab fa-linkedin-in" />
                                </button>
                            </div>
                            <span className="none">or use your account</span>
                            <input
                                required
                                autoComplete="false"
                                type="text"
                                placeholder="Email"
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                                value={this.state.email}
                            />
                            <input
                                required
                                autoComplete="false"
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    this.setState({ pass: e.target.value })
                                }
                                value={this.state.pass}
                            />
                            <Link to="/password">Forgot your password?</Link>
                            <button onClick={() => this.login()}>
                                Sign In
                            </button>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>
                                    Already have an account? <br />
                                    Keep connected with us! Please login with
                                    your personal info.
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
                                    Don't have an account? <br />
                                    Enter your personal details and start your
                                    journey with us.
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
