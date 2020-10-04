import React, { Component } from "react";
import MealIndicator from "./MealIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Header extends Component {
  showDeliveryDay = () => {
    const mySet = new Set();
    this.props.data.map((menuitem) => {
      if (menuitem.menu_date === this.props.myDate) {
        mySet.add(menuitem.delivery_days);
      }
      return menuitem;
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
            this.props.deliveryDay !== dayselector ||
            this.props.deliveryDay === ""
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
  };

  showSelectionOptions = () => {
    let deselectedMealButton = "selection-styles";
    let selectedMealButton = "selection-styles selected-days";
    let options = ["Surprise", "Skip", "Save"];
    let selections = [];
    for (const day of options) {
      let selectionOptions = day;
      selections.push(
        <button
          id={selectionOptions}
          value={selectionOptions}
          className={
            this.props.selectValue === "" ||
            this.props.selectValue !== selectionOptions
              ? deselectedMealButton
              : selectedMealButton
          }
          onClick={(e) => this.props.makeSelection(e)}
        >
          {selectionOptions}
        </button>
      );
    }
    return selections;
  };

  render() {
    const { meals, totalCount, totalMeals } = this.props;
    let mealsCount = parseInt(totalMeals);
    //To disable and enable save button
    if (document.getElementById("Save") !== null) {
      if (totalCount !== mealsCount) {
        document.getElementById("Save").disabled = true;
      } else {
        document.getElementById("Save").disabled = false;
      }
    }

    //To disable and enable date picker
    if (document.getElementById("date") !== null) {
      if (totalCount > 0 && totalCount != totalMeals) {
        document.getElementById("date").disabled = true;
      } else {
        document.getElementById("date").disabled = false;
      }
    }

    //To disable and enable meal-plan picker
    if (document.getElementById("meal-plan-picker") !== null) {
      if (
        totalCount > 0 &&
        totalCount != totalMeals &&
        this.props.selectValue !== "Skip"
      ) {
        document.getElementById("meal-plan-picker").disabled = true;
      } else {
        document.getElementById("meal-plan-picker").disabled = false;
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
            onChange={this.props.mealsOnChange}
            className='pickers'
            id='meal-plan-picker'
          >
            {meals.map((mealItem) => {
              let meal = JSON.parse(mealItem.items)[0];
              return <option value={mealItem.purchase_id}>{meal.name}</option>;
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
            {this.props.dates.map((date) => (
              <option value={date}>{date}</option>
            ))}
          </select>
          <div className='delivery-days'>{this.showDeliveryDay()}</div>
          <div className='suprise-skip-save'>{this.showSelectionOptions()}</div>
          <MealIndicator
            totalCount={this.props.totalCount}
            totalMeals={this.props.totalMeals}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
