import React from 'react';
import { connect } from 'react-redux';

import styles from './paymentDetails.module.css'

class PaymentDetails extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <h4 className={styles.mainHeading}> Payment Info </h4>
                <h6 className={styles.subHeading}> Payment Options </h6>
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
                        <input type="text" placeholder="First Name" className={styles.input}/>
                    </div>
                    <div className={styles.inputItem}>
                        <input type="text" placeholder="Last Name" className={styles.input}/>
                    </div>
                    <div className={styles.inputItem}>
                        <input type="text" placeholder="Street" className={styles.input}/>
                    </div>
                    <div className={styles.inputItem}>
                        <input type="text" placeholder="Unit" className={styles.input}/>
                    </div>
                    <div className={styles.inputItem + ' ' + styles.halfWidthInput}>
                        <input type="text" placeholder="City" className={styles.input}/>
                    </div>
                    <div className={styles.inputItem + ' ' + styles.halfWidthInput}>
                        <input type="text" placeholder="State" className={styles.input}/>
                    </div>
                    <div className={styles.inputItem + ' ' + styles.halfWidthInput}>
                        <input type="text" placeholder="Zip" className={styles.input}/>
                    </div>
                    <div className={styles.inputItem}>
                        <input type="text" placeholder="Phone Number" className={styles.input}/>
                    </div>
                    <div className={styles.inputItem}>
                        <textarea placeholder="Delivery Instructions" className={styles.input}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(PaymentDetails);