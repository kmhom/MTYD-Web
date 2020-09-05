import React from 'react';

import { Link } from "react-router-dom";

import styles from './navBar.module.css'

import SubscribeIcon from './noun_subscribe_2445070.svg';
import ProfileIcon from './noun_profile_2057160.svg';
import SelectIcon from './noun_select_2076436.svg';
import MoreIcon from './noun_more_897914.svg';

class SideNavBar extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.navContainer}>
                    <Link to='/'>
                        <div className={styles.navElt}>
                            <p> Home </p>
                        </div>
                    </Link>
                    <Link to='/choose-plan'>
                        <div className={styles.navElt}>
                            <img src={SubscribeIcon} alt="Subscribe"/>
                        </div>
                    </Link>
                    <div className={styles.navElt}>
                        <img src={ProfileIcon} alt="Profile"/>
                    </div>
                    <div className={styles.navElt}>
                        <img src={SelectIcon} alt="Select"/>
                    </div>
                    <div className={styles.navElt}>
                        <img src={MoreIcon} alt="More"/>
                    </div>
                </div>
            </div>
        );
    }
}


class BottomNavBar extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                {/* <div className='footer-icon-tray'>
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
                </div> */}
                <div className={styles.navContainer}>
                    <div className={styles.navElt}>
                        <Link to='/'>
                            <p> Home </p>
                        </Link>
                    </div>
                    <div className={styles.navElt}>
                        <Link to='/choose-plan'>
                            <img src={SubscribeIcon} alt="Subscribe"/>
                            <p> Subscribe </p>
                        </Link>
                    </div>
                    <div className={styles.navElt}>
                        <img src={ProfileIcon} alt="Profile"/>
                        <p> Profile </p>
                    </div>
                    <div className={styles.navElt}>
                        <img src={SelectIcon} alt="Select"/>
                        <p> Select </p>
                    </div>
                    <div className={styles.navElt}>
                        <img src={MoreIcon} alt="More"/>
                        <p> More </p>
                    </div>
                </div>
            </div>
        )
    }
}


export { BottomNavBar, SideNavBar };