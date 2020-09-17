import { number } from "prop-types";
import React, { Component } from "react";
import mealicon from "../ChoosePlan/dish.png";

export default class MealIndicator extends Component {
  render() {
    const { totalCount } = this.props;
    const { totalMeals } = this.props;
    // var colorPicker = "";
    // cartItems.length === 0
    //   ? (colorPicker = "meal-selection-indicator")
    //   : (colorPicker = `meal-selection-indicator meal-selection-indicator:nth-child(${cartItems.length}`);
    const selectCount = totalMeals - totalCount;

    let temp = 100 / totalMeals;
    const percentage = totalCount * temp;
    const myarr = [];
    for (let i = 0; i < totalMeals; i++) {
      myarr.push(i);
    }
    let indicatorColor = "";
    return (
      <div className='indicator-wrapper'>
        <div
          style={{
            border: "1px solid #ebebeb",
            borderColor: "#e09d51",
            borderRadius: "50px 0px 50px 0px",
            padding: "0px 0px 0px 14px",
            height: "2rem",
            margin: "0rem 1rem",
            width: "100%",
            background: `-moz-linear-gradient(left,  ${
              selectCount === 0
                ? (indicatorColor = "#42d4a8")
                : (indicatorColor = "#e09d51")
            } ${percentage}%, white 0%)`,
          }}
        >
          <p
            style={{
              display: this.props.displayCount,
              marginTop: "0.01rem",
              color: selectCount === 0 ? "white" : "black",
            }}
          >
            {selectCount === 0
              ? "All Meals Selected!"
              : `select ${selectCount} meals`}
          </p>
        </div>
      </div>
    );
  }
}
