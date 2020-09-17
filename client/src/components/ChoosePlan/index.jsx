import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlans, chooseMealsDelivery, choosePaymentOption, } from '../../reducers/actions/subscriptionActions';

import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import styles from './choosePlan.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faShareAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

class ChoosePlan extends React.Component {  

    constructor() {
        super();
        this.state = {
            mounted: false,
        }
    }

    componentDidMount() {
        // Check for logged in
        if (document.cookie.split(';').some((item) => item.trim().startsWith('customer_uid='))) {
            this.props.fetchPlans();
            this.setState({
                mounted: true,
            })
        }  else {
            // Reroute to log in page
            this.props.history.push('/')
        }
    }

    mealsDelivery = () => {
        let deselectedMealButton = styles.mealButton;
        let selectedMealButton = styles.mealButton + ' ' + styles.mealButtonSelected;
        let mealButtons = [];
        for (const plan of this.props.numItems) {
            let planStr = plan.toString();
            mealButtons.push(
                <button
                    key={planStr}
                    className={this.props.meals === planStr ? selectedMealButton : deselectedMealButton}
                    onClick={() => this.props.chooseMealsDelivery(planStr,this.props.paymentOption,this.props.plans)}
                >
                    {planStr} MEALS
                </button>
            )
        }
        return mealButtons;
    }

    paymentFrequency = () => {
        let deselectedPaymentOption = styles.paymentButton;
        let selectedPaymentOption = styles.paymentButton + ' ' + styles.paymentButtonSelected;
        let paymentOptionButtons = [];
        for (const option of this.props.paymentFrequency) {
            let optionStr = option.toString();
            paymentOptionButtons.push(
                <button
                    key={optionStr}
                    className={this.props.paymentOption === optionStr ? selectedPaymentOption : deselectedPaymentOption}
                    onClick={() => this.props.choosePaymentOption(optionStr,this.props.meals,this.props.plans)}
                >
                    {optionStr}
                </button>
            )
        }
        return paymentOptionButtons;
    }

    render() {
        if(!this.state.mounted) {
            return null;
        }
        return (
            <div className={styles.root}>
                <div className={styles.mealHeader}>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBars} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBell} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faShareAlt} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faSearch} className={"headerIcon"}/> </div>
                    <div className='title'>
                        <h4 className='mainTitle'>CHOOSE YOUR PLAN</h4>
                        <h6 className='subTitle'>LOCAL. ORGANIC. RESPONSIBLE.</h6>
                    </div>
                </div>
                <div className={styles.mealSelectMenu}>
                    <h6 className={styles.mealDays}>MEALS DELIVERIES ARE MONDAY,WEDNESDAY,FRIDAY</h6>
                    <h6 className={styles.subTitle}>NUMBER OF MEALS PER DELIVERY</h6>
                    <div className={styles.mealNumber}>
                        <div className={styles.buttonWrapper}>
                            {this.mealsDelivery()}
                        </div>
                    </div>
                    <p className={styles.subTitle2}>PAYMENT FREQUENCY</p>
                    <div className={styles.paymentWrapper}>
                        {this.paymentFrequency()}
                    </div>
                    <div className={styles.amount}>
                        <div className={styles.amountItem}>
                            <p> $$ TOTAL {this.props.selectedPlan.item_price} </p>
                        </div>
                        <div className={styles.amountItem}>
                            <Link to='/payment-details'>
                                <button>DONE</button>
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
}

const mapStateToProps = state => ({
    plans: state.subscribe.plans,
    numItems: state.subscribe.numItems,
    paymentFrequency: state.subscribe.paymentFrequency,
    meals: state.subscribe.meals,
    paymentOption: state.subscribe.paymentOption,
    selectedPlan: state.subscribe.selectedPlan,
})

export default connect(mapStateToProps, { fetchPlans, chooseMealsDelivery, choosePaymentOption, })(withRouter(ChoosePlan));