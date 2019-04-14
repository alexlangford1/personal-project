import React, { Component } from "react"
import './pop.css'

export default class PopList extends Component {
    render() {
        return (
            <div className='pop' >
                <div onClick={this.props.click}>X</div>
                <h1>pop up list</h1>
                
            </div>
        )
    }
}
