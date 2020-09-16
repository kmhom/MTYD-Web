import React from "react";
import { connect } from "react-redux";
import MenuItemList from "./menuItemList";
import NavBar from "../NavBar";

class ChoosePlan extends React.Component {
  render() {
    return (
      <div>
        <MenuItemList />
        {/* <NavBar /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  /* Put needed states from store here */
});

export default connect(mapStateToProps, {
  /* Needed functions from actions*/
})(ChoosePlan);
