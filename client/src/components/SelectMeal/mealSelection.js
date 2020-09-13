import React from "react";
import MenuItemList from "./menuItemList";
import NavBar from "../NavBar";

class MealSelection extends React.Component {
  constructor() {
    super();
    this.state = {
      meals: [],
      // totalMeals: 15,
    };

    this.loadMeals = this.loadMeals.bind(this);
  }
  componentDidMount() {
    this.loadMeals();
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
    console.log(mystr);
    return this.setState({
      totalMeals: mystr,
    });
  };

  render() {
    return (
      <div className='mealMain'>
        <MenuItemList
          meals={this.state.meals}
          mealsOnChange={this.mealsOnChange}
          totalMeals={this.state.totalMeals}
        />
        <NavBar />
      </div>
    );
  }
}

export default MealSelection;
