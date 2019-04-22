import React, { Component } from "react"
import Img from "./Img"

class ImgList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgClose: true,
        }
    }
    imageClick = (img) => {
        const { vacation_id } = this.props
        localStorage.setItem(`imageUrl${vacation_id}`, img)
    }
    render() {
        const results = this.props.data
        let imgs
        if (results.length >= 0) {
            imgs = results.map((img) => (
                <Img
                    settingClick={this.props.settingClick}
                    background={this.props.background}
                    imageClick={this.imageClick}
                    url={img.urls.thumb}
                    img={img.urls.raw}
                    user={img.user.links.html}
                    name={img.user.name}
                    link={img.links.html}
                    key={img.id}
                />
            ))
        }
        return (
            <section className="img-list">{imgs}</section>
        )
    }
}

export default ImgList
