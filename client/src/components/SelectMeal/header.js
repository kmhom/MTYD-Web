import React, { Component } from "react";
import MealIndicator from "./MealIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class Header extends Component {
  render() {
    const { meals } = this.props;
    return (
      <React.Fragment>
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
        <div className='sticky-header'>
          <select
            onClick={this.props.checkSave}
            onChange={this.props.mealsOnChange}
            className='pickers'
          >
            <option value='' selected>
              Select Meal Plan
            </option>
            {meals.map((mealItem) => {
              let meal = JSON.parse(mealItem.items)[0];
              return <option>{meal.name}</option>;
            })}
          </select>
          <FontAwesomeIcon icon={["far", "fa-angle-down"]} />
          <select
            onChange={this.props.filterDates}
            value={this.props.date}
            name='date'
            id='date'
            className='pickers'
          >
            <option value='' selected>
              Pick a date
            </option>
            {this.props.dates.map((date) => (
              <option value={date}>{date}</option>
            ))}
          </select>
          <div className='suprise-skip-save'>
            <button className='selection-styles' id='surprise-button'>
              Surprise
            </button>
            <button className='selection-styles' id='skip-button'>
              Skip
            </button>
            <button
              className='selection-styles'
              id='save-button'
              onClick={this.saveMeal}
            >
              Save
            </button>
          </div>
          <MealIndicator
            totalCount={this.props.totalCount}
            totalMeals={this.props.totalMeals}
            displayCount={this.props.displayCount}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
