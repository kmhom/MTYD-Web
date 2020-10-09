import React from "react";
import styles from "./selectmeal.module.css";
class MenuItem extends React.Component {
  render() {
    const { cartItems } = this.props;
    let x = this.props.data.filter(
      (date) => date.menu_date === this.props.myDate
    );

    return (
      <React.Fragment>
        {x.map((menuitem) => (
          <div key={menuitem.meal_uid} className={styles.menuitemIndividual}>
            <div
              style={{
                backgroundImage: `url(${menuitem.meal_photo_URL})`,
                backgroundSize: "cover",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
              className={styles.menuItem}
            >
              <i id={styles.favorite} className='fa fa-heart'></i>

              {cartItems.length > 0
                ? cartItems.map((item) => {
                    return (
                      item.menu_meal_id === menuitem.menu_meal_id && (
                        <p
                          id={styles.mealCounter}
                          className={styles.menuElements}
                        >
                          {item.count}
                        </p>
                      )
                    );
                  })
                : ""}

              <button
                onClick={() => this.props.removeFromCart(menuitem)}
                id={styles.minusButton}
                className={styles.menuElements}
              >
                -
              </button>
              <button
                onClick={() => this.props.addToCart(menuitem)}
                id={styles.plusButton}
                className={styles.menuElements}
              >
                +
              </button>
            </div>
            <p id={styles.menuItemTitle}>{menuitem.meal_name}</p>
            <p id={styles.menuItemDesc}>${menuitem.meal_price}</p>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default MenuItem;
