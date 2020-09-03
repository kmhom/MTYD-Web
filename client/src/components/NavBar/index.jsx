import React from 'react';

import { Link } from "react-router-dom";

import styles from './navBar.module.css'

import SubscribeIcon from './noun_subscribe_2445070.svg';
import ProfileIcon from './noun_profile_2057160.svg';
import SelectIcon from './noun_select_2076436.svg';
import MoreIcon from './noun_more_897914.svg';

class NavBar extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.navContainer}>
                    <Link to='/'>
                        <div className={styles.navElt}>
                            <p> Home </p>
                        </div>
                    </Link>
                    <Link to='/subscribe'>
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

export default NavBar;