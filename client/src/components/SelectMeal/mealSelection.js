import React from "react";
import Header from "./header";
import MenuItemList from "./menuItemList";
import NavBar from "../NavBar";

class MealSelection extends React.Component {
  render() {
    return (
      <div className='mealMain'>
        <Header />
        <MenuItemList />
        <NavBar />
      </div>
    );
  }
}

export default MealSelection;
