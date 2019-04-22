import React, { Component } from "react"
import axios from "axios"
import ImgList from "./ImgList"
import SearchForm from "./SearchForm"

export default class Unsplash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgs: [],
        }
    }

    performSearch = (query = "wallpaper") => {
        axios
            .get(
                `https://api.unsplash.com/search/photos/?page=1&per_page=26&query=${query}&client_id=${
                    process.env.REACT_APP_ACCESS_KEY
                }`,
            )
            .then((data) => {
                this.setState({ imgs: data.data.results })
            })
            .catch((err) => {
                console.log("Error happened during fetching!", err)
            })
    }

    componentDidMount() {
        this.performSearch()
    }

    render() {
        return (
            <div>
                <SearchForm onSearch={this.performSearch} />
                <div className="image-list">
                    <ImgList
                    settingClick={this.props.settingClick}

                        vacation_id={this.props.vacation_id}
                        data={this.state.imgs}
                        background={this.props.background}
                    />
                </div>
            </div>
        )
    }
}
