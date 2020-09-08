import React, { Component } from "react";
import mealicon from "../ChoosePlan/dish.png";

export class Header extends Component {
  render() {
    return (
      <div className='header-wrapper'>
        <div className='meal-header'>
          <i class='fa fa-bars headericon'></i>
          <i class='fas fa-bell headericon'></i>
          <i class='fa fa-share-alt headericon'></i>
          <i class='fa fa-search headericon'></i>
        </div>
        <div className='title'>
          <p id='chooseYourPlan'>MENU THIS WEEK</p>
          <p id='local'>LOCAL. ORGANIC. RESPONSIBLE.</p>
        </div>
        <div className='mealselectmenu'>
          <div className='flexclass'>
            <p id='date'>Mon, Aug 31st</p>
            <p id='save-button'>Save</p>
          </div>
          <div className='indicator-wrapper'>
            <div id='left-indicator' className='meal-selection-indicator'>
              <img className='dishicon' src={mealicon} alt='something.jpg' />
            </div>
            <div className='meal-selection-indicator'>
              <img className='dishicon' src={mealicon} alt='something.jpg' />
            </div>
            <div className='meal-selection-indicator'>
              <img className='dishicon' src={mealicon} alt='something.jpg' />
            </div>
            <div id='right-indicator' className='meal-selection-indicator'>
              <img className='dishicon' src={mealicon} alt='something.jpg' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
