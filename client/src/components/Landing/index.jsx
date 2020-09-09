import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faShareAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

import styles from './landing.module.css'

class Landing extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.mealHeader}>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBars} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faBell} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faShareAlt} className={"headerIcon"}/> </div>
                    <div className={styles.headerItem}> <FontAwesomeIcon icon={faSearch} className={"headerIcon"}/> </div>
                    <div className='title'>
                        <h4 className='mainTitle'>LOGIN</h4>
                        <h6 className='subTitle'>LOCAL. ORGANIC. RESPONSIBLE.</h6>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Landing);