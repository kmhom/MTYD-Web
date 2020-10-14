import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    resetProfile, fetchOrderHistory
} from '../../reducers/actions/profileActions';
import { resetSubsription } from '../../reducers/actions/subscriptionActions';
import { resetLogin } from '../../reducers/actions/loginActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faPen, faShareAlt, faSearch, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

import styles from './profile.module.css';

class Profile extends React.Component {

    constructor(){
        super();
        this.state = {
            mounted: false,
        }
    }

    componentDidMount() {
        console.log(document.cookie)
        if (document.cookie.split(';').some((item) => item.trim().startsWith('customer_uid='))) {
            // Logged in
            let customer_uid = document.cookie.split('; ').find(row => row.startsWith('customer_uid')).split('=')[1];
            console.log(customer_uid)
            // console.log(customerFirstName)
            this.props.fetchOrderHistory(customer_uid);
            this.setState({
                mounted: true,
            })
        } else {
            // Reroute to log in page
            this.props.history.push('/')
        }
    }

    render() {
        
        // Return nothing before login checked
        if(!this.state.mounted) {
            return (
                null
            )
        }
        return (
            <div className={styles.root}>
                <div className={styles.mealHeader}>
                    <div className={styles.headerItemContainer}>
                        <div className={styles.headerItem} > 
                            <FontAwesomeIcon icon={faBars} className={"headerIcon"}/>
                        </div>
                        {/*<div className={styles.headerItem}> <FontAwesomeIcon icon={faBell} className={"headerIcon"}/> </div>
                        <div className={styles.headerItem}> <FontAwesomeIcon icon={faShareAlt} className={"headerIcon"}/> </div>
        <div className={styles.headerItem}> <FontAwesomeIcon icon={faSearch} className={"headerIcon"}/> </div>
                        <div
                            className={styles.headerItem}
                            onClick={() => {
                                this.props.resetProfile();
                                this.props.resetSubsription();
                                this.props.resetLogin(() => {
                                    // Reroute to log in page
                                    this.props.history.push('/')
                                });
                            }}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className={"headerIcon"}/>
                        </div>
                        */}
                        <div className='title'>
                            <h4 className={styles.profileTitle}>USER PROFILE</h4>
                        </div>
                    </div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> CHOOSE PAYMENT METHOD </h6>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.cardItem}>
                        <FontAwesomeIcon icon={faPlus} className={styles.addPayment}/>
                    </div>
                    <div className={styles.cardItem}>
                        <FontAwesomeIcon icon={faPlus} className={styles.addPayment}/>
                    </div>
                    <div className={styles.cardItem}>
                        <FontAwesomeIcon icon={faPlus} className={styles.addPayment}/>
                    </div>
                    <div className={styles.cardItem}>
                        <FontAwesomeIcon icon={faPlus} className={styles.addPayment}/>
                    </div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> CHOOSE YOUR ADDRESS </h6>
                    </div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> FIRST NAME LAST NAME </h6>
                    </div>
                    <div className={styles.headingItem}>
                        <FontAwesomeIcon icon={faPen} className={styles.editIcon}/>
                    </div>
                </div>
                <div className={styles.billingAddress}>
                    <div>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sedo</div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> FIRST NAME LAST NAME </h6>
                    </div>
                    <div className={styles.headingItem}>
                        <FontAwesomeIcon icon={faPen} className={styles.editIcon}/>
                    </div>
                </div>
                <div className={styles.billingAddress}>
                    <div>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sedo</div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> Add Another Address </h6>
                    </div>
                    <FontAwesomeIcon icon={faPlus} className={styles.addPayment}/>
                </div>
                <div className={styles.orderHistoryContainer}>
                    <div className={styles.orderHistoryItem}>
                        <div className={styles.subHeading}>ENTER PASSWORD TO CONFIRM*</div>
                    </div>
                </div>
                <input type="text" className={styles.passwordText} placeholder="ENTER PASSWORD"/>
                <div>
                    <button className={styles.checkoutButton}>CHECKOUT</button>
                </div>
            </div>
        )
    }
};

Profile.propTypes = {
    resetProfile: PropTypes.func.isRequired,
    fetchOrderHistory: PropTypes.func.isRequired,
    orderHistory: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    orderHistory: state.profile.orderHistory,
})

const functionList = {
    resetLogin,
    resetProfile,
    resetSubsription,
    fetchOrderHistory,
}

export default connect(mapStateToProps, functionList )(withRouter(Profile));