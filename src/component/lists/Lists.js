import React, { Component } from 'react'
import axios from 'axios'

export default class List extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
    componentDidMount(){
      axios.get()
    }

    render() {
      return (
        <div className='lists'>
          <h1>List</h1>
        </div>
      )
    }
}