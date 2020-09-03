import React, { Component } from "react";

export class Center extends Component {
  render() {
    return (
      <div className='centerpanel'>
        <div>Navbar</div>
        <div className='home-image'>
          <p>Nutrition Made Easy</p>
          {/* <h6>Meal plans with your health in mind</h6> */}
        </div>
        <div classname='center-right'>
          <div>
            <h3>Why is eating healthy so hard?</h3>
            <p>
              "Subscribe to a Meal Plan that fits around your schedule, fills
              you sensations with incredible tastes and is rooted in classical
              Ayurvedic philosophies. The result is heavy on taste, light on fat
              and easy on the wallet."
            </p>
          </div>
          <div>
            <h4>Get your Meal delivered to your house in 3 Simple Steps!</h4>
            <ol>
              <li>Choose No of Meals</li>
              <li>Enter delivery information</li>
              <li>Setup Payment Method</li>
            </ol>
            <button>Plan Now </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Center;
