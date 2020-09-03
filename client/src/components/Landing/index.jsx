import React from "react";
import { connect } from "react-redux";
import Center from "./center";
import Right from "./right";
// Import needed actions

// Can also use functional components instead if you do not need to use lifecycle methods

class Landing extends React.Component {
  render() {
    return (
      <div className='landing'>
        {/* <Center /> */}
        {/* <Right /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  /* Put needed states from store here */
});

export default connect(mapStateToProps, {
  /* Needed functions from actions*/
})(Landing);
