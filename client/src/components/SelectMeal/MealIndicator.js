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

    let temp = 100 / totalMeals;
    const percentage = totalCount * temp;
    const myarr = [];
    for (let i = 0; i < totalMeals; i++) {
      myarr.push(i);
    }

    return (
      <div>
        {/* <div className='indicator-wrapper'>
          <div id='left-indicator' className={colorPicker}>
            <img className='dishicon' src={mealicon} alt='something.jpg' />
          </div>
          <div className={colorPicker}>
            <img className='dishicon' src={mealicon} alt='something.jpg' />
          </div>
          <div className={colorPicker}>
            <img className='dishicon' src={mealicon} alt='something.jpg' />
          </div>
          <div id='right-indicator' className={colorPicker}>
            <img className='dishicon' src={mealicon} alt='something.jpg' />
          </div>
        </div> */}
        <div className='indicator-wrapper'>
          <div
            style={{
              border: "1px solid #ebebeb",
              borderRadius: "50px 0px 50px 0px",
              padding: "0px 0px 0px 14px",
              height: "2rem",
              width: "100%",

              background: `-moz-linear-gradient(left, #fff343 ${percentage}%, white 0%)`,
            }}
          >
            {/* {myarr.map((item) => (
              <img className='dishicon' src={mealicon} alt='something.jpg' />
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}
