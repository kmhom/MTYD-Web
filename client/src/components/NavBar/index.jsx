import React from "react";
import subscribe from "../NavBar/subscribe.png";
import select from "../NavBar/select.png";
import profile from "../NavBar/profile.png";
import more from "../NavBar/more.png";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import SubscribeIcon from "./noun_subscribe_2445070.svg";
import ProfileIcon from "./noun_profile_2057160.svg";
import SelectIcon from "./noun_select_2076436.svg";
import MoreIcon from "./noun_more_897914.svg";

class SideNavBar extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.navContainer}>
          {/* <Link to='/'>
                        <div className={styles.navElt}>
                            <p> Home </p>
                        </div>
                    </Link> */}
          <Link to='/choose-plan'>
            <div className={styles.navElt}>
              <img src={SubscribeIcon} alt='Subscribe' />
            </div>
          </Link>
          <Link to='/profile'>
            <div className={styles.navElt}>
              <img src={ProfileIcon} alt='Profile' />
            </div>
          </Link>
          <div className={styles.navElt}>
            <img src={SelectIcon} alt='Select' />
          </div>
          <div className={styles.navElt}>
            <img src={MoreIcon} alt='More' />
          </div>
        </div>
      </div>
    );
  }
}

class BottomNavBar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <div className='meal-footer'>
          <div className='footer-icon-tray'>
            <img src={subscribe} className='footer-icons' alt='' />
            <p>Subscribe</p>
          </div>
          <Link to='/select-meal'>
            <div className='footer-icon-tray'>
              <img src={select} alt='' className='footer-icons' />
              <p>Select</p>
            </div>
          </Link>
          <div className='footer-icon-tray'>
            <img src={profile} alt='' className='footer-icons' />
            <p>Profile</p>
          </div>
          <div className='footer-icon-tray'>
            <img src={more} alt='' className='footer-icons' />
            <p>More</p>
          </div>
        </div>
      </div>
    );
  }
}

export { BottomNavBar, SideNavBar };
