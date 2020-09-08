import React, { Component } from "react";
import MenuItem from "./menuItem";
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
    return (
      <div className='menu-items-wrapper'>
        {this.state.data.map((menuitem) => (
          <div className='menuitem-individual'>
            <MenuItem
              title={menuitem.meal_name}
              imgSrc={menuitem.meal_photo_URL}
              desc={menuitem.meal_price}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default MenuItemList;
