import React from "react";

class MenuItem extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  incrementCount() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  decrementCount() {
    if (this.state.count >= 1) {
      this.setState({
        count: this.state.count - 1,
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundImage: `url(${this.props.imgSrc})`,
            backgroundSize: "cover",
          }}
          className='menu-item'
        >
          <i id='favorite' class='fa fa-heart'></i>
          <p id='meal-counter' className='menu-elements'>
            {this.state.count}
          </p>
          <button
            onClick={this.decrementCount}
            id='minus-button'
            className='menu-elements'
          >
            -
          </button>
          <button
            onClick={this.incrementCount}
            id='plus-button'
            className='menu-elements'
          >
            +
          </button>
        </div>
        <p id='menuItem-title'>{this.props.title}</p>
        <p id='menuItem-desc'>${this.props.desc}</p>
      </React.Fragment>
    );
  }
}

export default MenuItem;
