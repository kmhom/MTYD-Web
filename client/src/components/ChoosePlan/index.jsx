import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchPlans,
  chooseMealsDelivery,
  choosePaymentOption,
} from "../../reducers/actions/subscriptionActions";

import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import styles from "./choosePlan.module.css";
import takeaway from './take-away.svg'
class ChoosePlan extends React.Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    // Check for logged in
    if (
      document.cookie
        .split(";")
        .some((item) => item.trim().startsWith("customer_uid="))
    ) {
      this.props.fetchPlans();
      this.setState({
        mounted: true,
      });
    } else {
      // Reroute to log in page
      this.props.history.push("/");
    }
  }

  mealsDelivery = () => {
    let deselectedMealButton = styles.mealButton;
    let selectedMealButton =
      styles.mealButton + " " + styles.mealButtonSelected;
    let mealButtons = [];
    for (const plan of this.props.numItems) {
      let planStr = plan.toString();
      mealButtons.push(
        <button
          key={planStr}
          className={
            this.props.meals === planStr
              ? selectedMealButton
              : deselectedMealButton
          }
          onClick={() =>
            this.props.chooseMealsDelivery(
              planStr,
              this.props.paymentOption,
              this.props.plans
            )
          }
        >
          {planStr} MEALS
        </button>
      );
    }
    return mealButtons;
  };

  paymentFrequency = () => {
    let deselectedPaymentOption = styles.paymentButton;
    let selectedPaymentOption =
      styles.paymentButton + " " + styles.paymentButtonSelected;
    let paymentOptionButtons = [];
    for (const option of this.props.paymentFrequency) {
      let optionStr = option.toString();
      paymentOptionButtons.push(
        <button
          key={optionStr}
          className={
            this.props.paymentOption === optionStr
              ? selectedPaymentOption
              : deselectedPaymentOption
          }
          onClick={() =>
            this.props.choosePaymentOption(
              optionStr,
              this.props.meals,
              this.props.plans
            )
          }
        >
          {optionStr}
        </button>
      );
    }
    return paymentOptionButtons;
  };

  render() {
    if (!this.state.mounted) {
      return null;
    }
    return (
      <div className={styles.root}>
        <div className={styles.mealHeader}>
        <p
            style={{
              flex: "6",
              textAlign: "center",
              fontSize: "22px",
              color: "black",
              fontWeight: "bold",
              paddingLeft: "50px",
            }}
          >
            CHOOSE MEAL PLAN
          </p>

          {/* <p id={styles.local}>LOCAL. ORGANIC. RESPONSIBLE.</p> */}
          <div className={styles.avatar}></div>
        </div>
        <div style={{ alignSelf:"center", marginTop:"1rem", paddingBottom:"15px", margin:"2rem", borderRadius:"15px", boxShadow:"1px 1px 1px 2px #d3d3d3 "}}>
        <div className={styles.mealSelectMenu}>
          <div style={{display:"flex", flexDirection:"row", marginTop:"1rem", padding:"10px"}}>
          <img style={{height:"50px", width:"50px"}} src={takeaway} alt="React Logo" />
          <div style={{display:"flex", flexDirection:"column"}}>
          <h6 style={{margin:"0px 2px"}}>
            MEALS DELIVERIES ARE
          </h6>
          <h6 style={{margin:"0px 2px", color:"#FF9E19"}}>
            MONDAY,WEDNESDAY,FRIDAY
          </h6>
          </div>
          </div>
          <div style={{textAlign:"center"}}>
          <h6 className={styles.subTitle}>NUMBER OF MEALS PER DELIVERY</h6>

          </div>
          <div className={styles.mealNumber}>
            <div className={styles.buttonWrapper}>{this.mealsDelivery()}</div>
          </div>
          <hr style={{color:"#FFBA00"}}/>
          <p className={styles.subTitle2}>PRE PAY OPTIONS</p>
          <div className={styles.paymentWrapper}>{this.paymentFrequency()}</div>
          <div className={styles.amount}>
              <p style={{padding:"11px 0px 0px 0px", height:"40px" ,textAlign:"center", backgroundColor:"#FFF0C6", fontSize:"large", fontWeight:"600", color:"black"}} className={styles.amountItem}> $$ TOTAL {this.props.selectedPlan.item_price} </p>
              <Link to='/payment-details'>
                <button style={{textAlign:"center", backgroundColor:"#FF9E19", fontSize:"large", fontWeight:"400", color:"white"}} className={styles.amountItem}>PROCEED</button>
              </Link>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

ChoosePlan.propTypes = {
  fetchPlans: PropTypes.func.isRequired,
  chooseMealsDelivery: PropTypes.func.isRequired,
  choosePaymentOption: PropTypes.func.isRequired,
  numItems: PropTypes.array.isRequired,
  paymentFrequency: PropTypes.array.isRequired,
  meals: PropTypes.string.isRequired,
  paymentOption: PropTypes.string.isRequired,
  selectedPlan: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  plans: state.subscribe.plans,
  numItems: state.subscribe.numItems,
  paymentFrequency: state.subscribe.paymentFrequency,
  meals: state.subscribe.meals,
  paymentOption: state.subscribe.paymentOption,
  selectedPlan: state.subscribe.selectedPlan,
});

export default connect(mapStateToProps, {
  fetchPlans,
  chooseMealsDelivery,
  choosePaymentOption,
})(withRouter(ChoosePlan));
