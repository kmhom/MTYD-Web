import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    fetchOrderHistory
} from '../../reducers/actions/profileActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faPen, faShareAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

import styles from './profile.module.css';

class Profile extends React.Component {

    componentDidMount() {
        this.props.fetchOrderHistory();
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.mealHeader}>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBars} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBell} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faShareAlt} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faSearch} className={"headerIcon"}/> </div>
                    <div className='title'>
                        <h4 className='mainTitle'>USER PROFILE</h4>
                        <h6 className='subTitle'>LOCAL. ORGANIC. RESPONSIBLE.</h6>
                    </div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> Personal Details </h6>
                    </div>
                    <div className={styles.headingItem}>
                        <FontAwesomeIcon icon={faPen} className={styles.editIcon}/>
                    </div>
                </div>
                <div className={styles.personalDetails}>
                    <div> First Name Last Name</div>
                    <div> Email </div>
                    <div> Phone </div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> Payment Cards </h6>
                    </div>
                    <div className={styles.headingItem}>
                        <FontAwesomeIcon icon={faPen} className={styles.editIcon}/>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.cardItem}>
                    </div>
                    <div className={styles.cardItem}>
                    </div>
                    <div className={styles.cardItem}>
                    </div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> Billing Address </h6>
                    </div>
                    <div className={styles.headingItem}>
                        <FontAwesomeIcon icon={faPen} className={styles.editIcon}/>
                    </div>
                </div>
                <div className={styles.billingAddress}>
                    <div>Lorem Ipsum</div>
                    <div>Lorem Ipsum</div>
                    <div>Lorem Ipsum</div>
                </div>
                <div className={styles.headingContainer}>
                    <div className={styles.headingItem}>
                        <h6 className={styles.subHeading}> Order History </h6>
                    </div>
                </div>
                <div className={styles.orderHistoryContainer}>
                    <div className={styles.orderHistoryItem}>
                        <div className={styles.orderHistoryItemContianer}>
                            <div className={styles.orderHistorySubItem}>
                                {/* <img alt-="Menu Item"/> */}
                                <div> Image </div>
                            </div>
                            <div className={styles.orderHistorySubItem}>
                                <p> Title </p>
                            </div>
                            <div className={styles.orderHistorySubItem}>
                                Quantity
                            </div>
                            <div className={styles.orderHistorySubItem}>
                                Total
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

Profile.propTypes = {
    fetchOrderHistory: PropTypes.func.isRequired,
    orderHistory: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    orderHistory: state.profile.orderHistory,
})

export default connect(mapStateToProps, { fetchOrderHistory } )(Profile);