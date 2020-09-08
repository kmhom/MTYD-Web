import React from "react";
import subscribe from "../NavBar/subscribe.png";
import select from "../NavBar/select.png";
import profile from "../NavBar/profile.png";
import more from "../NavBar/more.png";

class NavBar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <div className='meal-footer'>
          <div className='footer-icon-tray'>
            <img src={subscribe} className='footer-icons' alt='' />
            <p>Subscribe</p>
          </div>
          <div className='footer-icon-tray'>
            <img src={select} alt='' className='footer-icons' />
            <p>Select</p>
          </div>
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

export default NavBar;
