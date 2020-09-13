import React, { Component } from "react";
import MenuItem from "./menuItem";
import Filter from "./Filter";
import MealIndicator from "./MealIndicator";
import axios from "axios";
export class MenuItemList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      myDate: "2020-09-13",
      cartItems: [],
      totalCount: 0,
    };
    this.saveMeal = this.saveMeal.bind(this);
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

  filterDates = (event) => {
    console.log(event.target.value);
    this.setState({
      myDate: event.target.value,
    });
  };

  addToCart = (menuitem) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    if (this.state.totalCount < 4) {
      cartItems.forEach((item) => {
        if (item.menu_uid === menuitem.menu_uid) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        cartItems.push({ ...menuitem, count: 1 });
      }

      this.setState({ cartItems, totalCount: this.state.totalCount + 1 });
    }
  };

  removeFromCart = (menuitem) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart_1 = false;
    cartItems.forEach((item) => {
      if (this.state.totalCount > 0) {
        if (item.menu_uid === menuitem.menu_uid) {
          if (item.count !== 0) {
            alreadyInCart_1 = true;
            item.count--;
          }
          if (
            item.menu_uid === menuitem.menu_uid &&
            alreadyInCart_1 &&
            item.count == 0
          ) {
            cartItems.pop({ ...item, count: 0 });
          }
          this.setState({ cartItems, totalCount: this.state.totalCount - 1 });
        }
      }
    });
  };

  saveMeal() {
    const myarr = [];
    this.state.cartItems.map((meal) => {
      myarr.push({
        qty: meal.count,
        name: meal.meal_name,
        price: meal.meal_price,
        item_uid: meal.meal_uid,
      });
    });
    console.log(myarr);
    const data = {
      is_addon: false,
      items: myarr,
      purchase_id: "400-000024",
      menu_date: "2020-09-13",
      delivery_day: "Sunday",
    };
    axios
      .post("http://localhost:2000/api/v2/meals_selection", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const dates = this.state.data.map((date) => date.menu_date);
    const uniqueDates = Array.from(new Set(dates));

    return (
      <div className='mealMenuWrapper'>
        <div className='mealselectmenu'>
          <div className='flexclass'>
            <Filter dates={uniqueDates} filterDates={this.filterDates} />
            <button id='save-button' onClick={this.saveMeal}>
              Save
            </button>
          </div>
          <MealIndicator totalCount={this.state.totalCount} />
        </div>
        <div className='menu-items-wrapper'>
          <MenuItem
            addToCart={this.addToCart}
            removeFromCart={this.removeFromCart}
            data={this.state.data}
            myDate={this.state.myDate}
            cartItems={this.state.cartItems}
          />
        </div>
      </div>
    );
  }
}

export default MenuItemList;
