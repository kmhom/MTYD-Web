import React, { Component } from "react";
import MenuItem from "./menuItem";

export class Header extends Component {
  render() {
    const { meals } = this.props;

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
        <div>
          <select onChange={this.props.mealsOnChange} className='mealSelector'>
            <option value='' selected>
              Select Meal Plan
            </option>
            {meals.map((mealItem) => {
              let meal = JSON.parse(mealItem.items)[0];
              return <option>{meal.name}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default Header;
