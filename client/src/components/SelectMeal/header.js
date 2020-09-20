import React, { Component } from "react";
import MealIndicator from "./MealIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Header extends Component {
  showDeliveryDay = () => {
    const mySet = new Set();
    this.props.data.map((menuitem) => {
      if (menuitem.menu_date == this.props.myDate) {
        mySet.add(menuitem.delivery_days);
      }
    });
    const myarr = [...mySet];
    let str = "";
    let temp = "";
    if (myarr.length > 0) {
      str = myarr[0];
      temp = str.replace(/[^a-zA-Z ]/g, "").split(" ");
    }

    let deselectedMealButton = "selection-styles";
    let selectedMealButton = "selection-styles selected-days";
    let mealdays = [];
    for (const day of temp) {
      let dayselector = day;
      mealdays.push(
        <button
          key={dayselector}
          value={dayselector}
          className={
            this.props.deliveryDay == "" ||
            this.props.deliveryDay != dayselector
              ? deselectedMealButton
              : selectedMealButton
          }
          onClick={(e) => this.props.setDeliveryDay(e)}
        >
          {dayselector}
        </button>
      );
    }
    return mealdays;

    // return temp.length > 0
    //   ? temp.map((day) => (
    //       <button
    //         className='selection-styles-1'
    //         value={day}
    //         onClick={(e) => this.props.setDeliveryDay(e)}
    //       >
    //         {day}
    //       </button>
    //     ))
    //   : "";
  };

  render() {
    const { meals } = this.props;

    //To disable and enable save button
    if (document.getElementById("save-button") != null) {
      if (this.props.totalCount != this.props.totalMeals) {
        document.getElementById("save-button").disabled = true;
      } else {
        document.getElementById("save-button").disabled = false;
      }
    }

    //To disable and enable Surprise button
    if (document.getElementById("surprise-button") != null) {
      if (
        this.props.myDate == "" ||
        document.getElementById("meal-plan-picker").value == null
      ) {
        document.getElementById("surprise-button").disabled = true;
      } else {
        document.getElementById("surprise-button").disabled = false;
      }
    }

    //To disable and enable Skip button
    if (document.getElementById("skip-button") != null) {
      if (
        this.props.myDate == "" ||
        document.getElementById("meal-plan-picker").value == null
      ) {
        document.getElementById("skip-button").disabled = true;
      } else {
        document.getElementById("skip-button").disabled = false;
      }
    }

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
            id='meal-plan-picker'
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
          <div className='delivery-days'>{this.showDeliveryDay()}</div>
          <div className='suprise-skip-save'>
            <button
              onClick={this.props.surprise}
              className='selection-styles'
              id='surprise-button'
            >
              Surprise
            </button>
            <button
              onClick={this.props.skip}
              className='selection-styles'
              id='skip-button'
            >
              Skip
            </button>
            <button
              className='selection-styles'
              id='save-button'
              onClick={this.props.saveMeal}
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
