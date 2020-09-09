import React, { Component } from "react";
import MenuItem from "./menuItem";
import mealicon from "../ChoosePlan/dish.png";

export class MenuItemList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  loadMenuItems = () => {
    fetch(`http://localhost:2000/api/v2/upcoming_menu`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: [...json.result],
        });
        console.log(this.state.data[0].length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.loadMenuItems();
  }

  render() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = (yyyy + "-" + mm + "-" + dd).toString();
    // console.log(today.toString());

    return (
      <div>
        <div className='mealselectmenu'>
          <div className='flexclass'>
            {/* <p id='date'>{today}</p> */}
            <p id='date'>Sun, Sept 13</p>
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
        <div className='menu-items-wrapper'>
          {this.state.data
            .filter((date) => date.menu_date == "2020-09-13")
            .map((menuitem) => (
              <div className='menuitem-individual'>
                <MenuItem
                  title={menuitem.meal_name}
                  imgSrc={menuitem.meal_photo_URL}
                  desc={menuitem.meal_price}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default MenuItemList;
