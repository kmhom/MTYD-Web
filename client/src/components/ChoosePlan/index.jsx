import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { chooseMealsDelivery, choosePaymentOption, changeTotalPayment } from '../../reducers/actions/subscriptionActions';

import { Link } from "react-router-dom";

import styles from './choosePlan.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faShareAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

class ChoosePlan extends React.Component {  
    render() {
        let deselectedMealButton = styles.mealButton;
        let selectedMealButton = styles.mealButton + ' ' + styles.mealButtonSelected;
        let deselectedPaymentOption = styles.paymentButton;
        let selectedPaymentOption = styles.paymentButton + ' ' + styles.paymentButtonSelected;
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
                            <button
                                className={ this.props.meals === 2 ? selectedMealButton : deselectedMealButton}
                                onClick={() => this.props.chooseMealsDelivery(2)}
                            >
                                2 MEALS
                            </button>
                            <button
                                className={ this.props.meals === 4 ? selectedMealButton : deselectedMealButton}
                                onClick={() => this.props.chooseMealsDelivery(4)}
                            >
                                4 MEALS
                            </button>
                            <button
                                className={ this.props.meals === 6 ? selectedMealButton : deselectedMealButton}
                                onClick={() => this.props.chooseMealsDelivery(6)}
                            >
                                6 MEALS
                            </button>
                            <button
                                className={ this.props.meals === 8 ? selectedMealButton : deselectedMealButton}
                                onClick={() => this.props.chooseMealsDelivery(8)}
                            >
                                8 MEALS
                            </button>
                        </div>
                    </div>
                    <p className={styles.subTitle2}>PAYMENT FREQUENCY</p>
                    <div className={styles.paymentWrapper}>
                        <button
                            className={this.props.paymentOption === '1' ? selectedPaymentOption : deselectedPaymentOption}
                            onClick={() => this.props.choosePaymentOption('1')}
                        >
                            1
                        </button>
                        <button
                            className={this.props.paymentOption === '2' ? selectedPaymentOption : deselectedPaymentOption}
                            onClick={() => this.props.choosePaymentOption('2')}
                        >
                            2
                        </button>
                        <button
                            className={this.props.paymentOption === '3' ? selectedPaymentOption : deselectedPaymentOption}
                            onClick={() => this.props.choosePaymentOption('3')}
                        >
                            3
                        </button>
                    </div>
                    <div className={styles.amount}>
                        <div className={styles.amountItem}>
                            <input
                                type="number"
                                min='0'
                                placeholder="$$ TOTAL"
                                value={this.props.paymentTotal}
                                onChange={(e) => {
                                    this.props.changeTotalPayment(e.target.value)
                                }}
                            />
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
    chooseMealsDelivery: PropTypes.func.isRequired,
    choosePaymentOption: PropTypes.func.isRequired,
    changeTotalPayment: PropTypes.func.isRequired,
    meals: PropTypes.number.isRequired,
    paymentOption: PropTypes.string.isRequired,
    paymentTotal: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    meals: state.subscribe.meals,
    paymentOption: state.subscribe.paymentOption,
    paymentTotal: state.subscribe.paymentTotal,
})

export default connect(mapStateToProps, { chooseMealsDelivery, choosePaymentOption, changeTotalPayment })(ChoosePlan);