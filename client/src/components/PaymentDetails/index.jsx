import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    changeAddressFirstName, changeAddressLastName, changeAddressStreet,
    changeAddressUnit, changeAddressCity, changeAddressState, changeAddressZip,
    changeAddressPhone, changeDeliveryInstructions, submitPayment
} from '../../reducers/actions/subscriptionActions';

import { withRouter } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faShareAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

import styles from './paymentDetails.module.css'

class PaymentDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            mounted: false,
        }
    }

    componentDidMount() {
        if (document.cookie.split(';').some((item) => item.trim().startsWith('customer_uid='))) {
            this.setState({
                mounted: true,
            })
        } else {
            // Reroute to log in page
            this.props.history.push('/')
        }
    }

    render() {
        if(!this.state.mounted) {
            return null;
        }
        // let customer_uid = document.cookie.split('; ').find(row => row.startsWith('customer_uid')).split('=')[1];
        return (
            <div className={styles.root}>
                <div className={styles.mealHeader}>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBars} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBell} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faShareAlt} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faSearch} className={"headerIcon"}/> </div>
                    <div className='title'>
                        <h4 className='mainTitle'>PAYMENT INFO</h4>
                        <h6 className='subTitle'>LOCAL. ORGANIC. RESPONSIBLE.</h6>
                    </div>
                </div>
                <div className={styles.topHeading}>
                    <h6 className={styles.subHeading}> Payment Options </h6>
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.cardItem}>
                    </div>
                    <div className={styles.cardItem}>
                    </div>
                    <div className={styles.cardItem}>
                    </div>
                    <div className={styles.cardItem}>
                    </div>
                </div>
                <h6 className={styles.subHeading}> Address Details </h6>
                <div className={styles.inputContainer}>
                    <div className={styles.inputItem}>
                        <input
                            type="text"
                            placeholder="First Name"
                            className={styles.input}
                            value={this.props.firstName}
                            onChange={(e) => {
                                this.props.changeAddressFirstName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className={styles.input}
                            value={this.props.lastName}
                            onChange={(e) => {
                                this.props.changeAddressLastName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <input
                            type="text"
                            placeholder="Address"
                            className={styles.input}
                            value={this.props.street}
                            onChange={(e) => {
                                this.props.changeAddressStreet(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <input
                            type="text"
                            placeholder="Unit"
                            className={styles.input}
                            value={this.props.unit}
                            onChange={(e) => {
                                this.props.changeAddressUnit(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <input
                            type="text"
                            placeholder="City"
                            className={styles.input}
                            value={this.props.city}
                            onChange={(e) => {
                                this.props.changeAddressCity(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <input
                            type="text"
                            placeholder="State"
                            className={styles.input}
                            value={this.props.state}
                            onChange={(e) => {
                                this.props.changeAddressState(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <input
                            type="text"
                            placeholder="Zip"
                            className={styles.input}
                            value={this.props.zip}
                            onChange={(e) => {
                                this.props.changeAddressZip(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className={styles.input}
                            value={this.props.phone}
                            onChange={(e) => {
                                this.props.changeAddressPhone(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.inputItem}>
                        <textarea
                            placeholder="Delivery Instructions"
                            className={styles.input}
                            value={this.props.instructions}
                            onChange={(e) => {
                                this.props.changeDeliveryInstructions(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            this.props.submitPayment(
                                'will be customer id',this.props.password,this.props.firstName,this.props.lastName,this.props.phone, this.props.street, this.props.unit,
                                this.props.city, this.props.state, this.props.zip, this.props.instructions, this.props.selectedPlan,
                            );
                        }}
                    >
                        DONE
                    </button>
                </div>
            </div>
        );
    }
}

PaymentDetails.propTypes = {
    changeAddressFirstName: PropTypes.func.isRequired,
    changeAddressLastName: PropTypes.func.isRequired,
    changeAddressStreet: PropTypes.func.isRequired,
    changeAddressUnit: PropTypes.func.isRequired,
    changeAddressState: PropTypes.func.isRequired,
    changeAddressZip: PropTypes.func.isRequired,
    changeAddressPhone: PropTypes.func.isRequired,
    changeDeliveryInstructions: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    firstName: state.subscribe.addressInfo.firstName,
    lastName: state.subscribe.addressInfo.lastName,
    street: state.subscribe.address.street,
    unit: state.subscribe.address.unit,
    city: state.subscribe.address.city,
    state: state.subscribe.address.state,
    zip: state.subscribe.address.zip,
    phone: state.subscribe.addressInfo.phoneNumber,
    instructions: state.subscribe.deliveryInstructions,
    selectedPlan: state.subscribe.selectedPlan,
    email: state.login.email,
    password: state.login.password,
})

const functionList = {
    changeAddressFirstName,
    changeAddressLastName,
    changeAddressStreet,
    changeAddressUnit,
    changeAddressCity,
    changeAddressState,
    changeAddressZip,
    changeAddressPhone,
    changeDeliveryInstructions,
    submitPayment,
}

export default connect(mapStateToProps, functionList )(withRouter(PaymentDetails));