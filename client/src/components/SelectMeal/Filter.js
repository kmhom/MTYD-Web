import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <div>
          <select
            onChange={this.props.filterDates}
            value={this.props.date}
            name='date'
            id='date'
          >
            <option value='' selected>
              Pick a date
            </option>
            {this.props.dates.map((date) => (
              <option value={date}>{date}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
