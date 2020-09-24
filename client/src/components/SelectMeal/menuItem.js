import React from "react";

class MenuItem extends React.Component {
  render() {
    const { cartItems } = this.props;

    return (
      <React.Fragment>
        {this.props.data
          .filter((date) => date.menu_date === this.props.myDate)
          .map((menuitem) => (
            <div className='menuitem-individual'>
              <div
                style={{
                  backgroundImage: `url(${menuitem.meal_photo_URL})`,
                  backgroundSize: "cover",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                className='menu-item'
              >
                <i id='favorite' class='fa fa-heart'></i>
                <p id='meal-counter' className='menu-elements'>
                  {cartItems.map((item) =>
                    item.menu_meal_id === menuitem.menu_meal_id
                      ? item.count
                      : ""
                  )}
                </p>

                <button
                  onClick={() => this.props.removeFromCart(menuitem)}
                  id='minus-button'
                  className='menu-elements'
                >
                  -
                </button>
                <button
                  onClick={() => this.props.addToCart(menuitem)}
                  id='plus-button'
                  className='menu-elements'
                >
                  +
                </button>
              </div>
              <p id='menuItem-title'>{menuitem.meal_name}</p>
              <p id='menuItem-desc'>${menuitem.meal_price}</p>
            </div>
          ))}
      </React.Fragment>
    );
  }
}

export default MenuItem;
