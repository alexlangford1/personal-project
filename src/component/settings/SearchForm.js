import React, { Component } from "react";

export default class SearchForm extends Component {
  state = {
    searchText: "",
  };

  onSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.query.value);
    // e.currentTarget.reset();
  };

  render() {
    return (
      <form className="search-form" onChange={this.handleSubmit}>
        <input
          autoComplete="off"
          type="search"
          onChange={this.onSearchChange}
          ref={(input) => (this.query = input)}
          name="search"
          placeholder="Find Photo..."
        />
      </form>
    );
  }
}
