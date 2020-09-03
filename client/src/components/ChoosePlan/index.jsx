import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { chooseDay, chooseMealsDelivery, choosePaymentOption, changeTotalPayment } from '../../reducers/actions/subscriptionActions';

import styles from './choosePlan.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faShareAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

class ChoosePlan extends React.Component {  
    render() {
        // let deselectedMeal = styles.mealsDeliverySection;
        // let selectedMeal = styles.mealsDeliverySection + ' ' + styles.mealsDeliverySelected;
        // let deselectPaymentOption = styles.paymentOptionsSection;
        // let selectedPaymentOption = styles.paymentOptionsSection + ' ' + styles.paymentOptionSelected;
        return (
            <div className={styles.root}>
                <div className={styles.mealHeader}>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBars} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBell} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faShareAlt} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faSearch} className={"headerIcon"}/> </div>
                </div>
                <div className='title'>
                    <p id='chooseYourPlan'>CHOOSE YOUR PLAN</p>
                    <p id='local'>LOCAL. ORGANIC. RESPONSIBLE.</p>
                </div>
                <div className='mealselectmenu'>
                <div id='mealdays'>MEALS DELIVERIES ARE MONDAY,WEDNESDAY,FRIDAY</div>
                    <p className='internal-titles'>NUMBER OF MEALS PER DELIVERY</p>
                    <div className='meal-number'>
                        <div className='button-wrapper'>
                        <button className='meal-button'>2 MEALS</button>
                        <button className='meal-button'>4 MEALS</button>
                        <button className='meal-button'>6 MEALS</button>
                        <button className='meal-button'>8 MEALS</button>
                    </div>
                </div>

                <p className='internal-titles'>PAYMENT FREQUENCY</p>
                <div className='payment-wrapper'>
                    <button className='payment-button'>1</button>
                    <button className='payment-button'>2</button>
                    <button className='payment-button'>3</button>
                </div>
                <div className='amount'>
                    <p id='totalamount'>$$ TOTAL</p>
                    <p id='done-button'>DONE</p>
                </div>
                </div>

                <div className='meal-footer'>
                <div className='footer-icon-tray'>
                    <i class='fa fa-heart'></i>
                    <p>Favorites</p>
                </div>
                <div className='footer-icon-tray'>
                    <i class='fa fa-search'></i>
                    <p>Search</p>
                </div>
                <div className='footer-icon-tray'>
                    <i class='fas fa-exclamation-circle '></i>
                    <p>Information</p>
                </div>
                <div className='footer-icon-tray'>
                    <i class='fas fa-bell'></i>
                    <p>Notifications</p>
                </div>
                </div>
            </div>
        );
    }
}

ChoosePlan.propTypes = {
    chooseDay: PropTypes.func.isRequired,
    chooseMealsDelivery: PropTypes.func.isRequired,
    choosePaymentOption: PropTypes.func.isRequired,
    changeTotalPayment: PropTypes.func.isRequired,
    day: PropTypes.string.isRequired,
    meals: PropTypes.number.isRequired,
    paymentOption: PropTypes.string.isRequired,
    paymentTotal: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
    day: state.subscribe.day,
    meals: state.subscribe.meals,
    paymentOption: state.subscribe.paymentOption,
    paymentTotal: state.subscribe.paymentTotal,
})

export default connect(mapStateToProps, { chooseDay, chooseMealsDelivery, choosePaymentOption, changeTotalPayment })(ChoosePlan);