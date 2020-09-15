import React, { Component } from "react";
import MenuItem from "./menuItem";
import Filter from "./Filter";
import MealIndicator from "./MealIndicator";
import axios from "axios";
import Header from "./header";
export class MenuItemList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      myDate: "",
      cartItems: [],
      meals: [],
      totalCount: 0,
      displayCount: "none",
    };
    this.saveMeal = this.saveMeal.bind(this);
    this.loadMeals = this.loadMeals.bind(this);
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
    this.loadMeals();
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
    if (this.state.totalCount < this.state.totalMeals) {
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
          if (item.count != 0) {
            alreadyInCart_1 = true;
            item.count--;
          }
          this.setState({ cartItems, totalCount: this.state.totalCount - 1 });
        }
      }
    });
    cartItems.forEach((meal) => {
      if (
        meal.menu_uid == menuitem.menu_uid &&
        meal.count == 0 &&
        this.state.totalCount > 0
      ) {
        this.setState({
          cartItems: cartItems.filter((x) => x.menu_uid !== menuitem.menu_uid),
          totalCount: this.state.totalCount - 1,
        });
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
      purchase_id: this.state.purchaseID,
      menu_date: this.state.myDate,
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

  loadMeals() {
    fetch(
      `https://ht56vci4v9.execute-api.us-west-1.amazonaws.com/dev/api/v2/customer_lplp?customer_uid=100-000001`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          meals: [...json.result],
        });
        // console.log(this.state.meals);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  mealsOnChange = (e) => {
    let planCount = e.target.value;
    let mystr = planCount.toString().slice(0, 2);
    this.state.meals.map((mealItem) => {
      let meal = JSON.parse(mealItem.items)[0];
      if (meal.name == planCount) {
        this.setState({
          purchaseID: mealItem.purchase_uid,
        });
      }
    });
    return this.setState({
      totalMeals: mystr,
      cartItems: [],
      totalCount: 0,
      displayCount: "block",
    });
  };

  checkSave = (e) => {
    if (this.state.totalCount == 0) {
      console.log(e.target.value);
    }
  };

  render() {
    const dates = this.state.data.map((date) => date.menu_date);
    const uniqueDates = Array.from(new Set(dates));

    return (
      <div className='mealMenuWrapper'>
        <div className='mealselectmenu'>
          <Header meals={this.state.meals} mealsOnChange={this.mealsOnChange} />
          <div className='flexclass'>
            <Filter dates={uniqueDates} filterDates={this.filterDates} />
            <button id='save-button' onClick={this.saveMeal}>
              Save
            </button>
          </div>
          <MealIndicator
            totalCount={this.state.totalCount}
            totalMeals={this.state.totalMeals}
            displayCount={this.state.displayCount}
          />
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
