import React, { Component } from "react";

export class Center extends Component {
  render() {
    return (
      <div className='mainPanel'>
        <div className='MainImage'>Nutrition Made Easy</div>
        <div className='info'>
          <div>
            <h3>Why is eating healthy so hard?</h3>
            <p>
              "Subscribe to a Meal Plan that fits around your schedule, fills
              you sensations with incredible tastes and is rooted in classical
              Ayurvedic philosophies. The result is heavy on taste, light on fat
              and easy on the wallet."
            </p>
          </div>
        </div>
        <div className='loginPanel'>
          {/* <span>Meal Plans with you Health in Mind</span> */}
          <button className='signUp'>Sign Up</button>
          <p id='already'>
            Already Registered? <span>Sign In</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Center;
