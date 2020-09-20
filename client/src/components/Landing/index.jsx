import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  changeEmail,
  changePassword,
  loginAttempt,
  socialLoginAttempt,
} from "../../reducers/actions/loginActions";
import { withRouter } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faShareAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import GoogleLogin from 'react-google-login';

import styles from './landing.module.css'

class Landing extends React.Component {

    responseGoogle = response => {
        console.log(response);
        if(response.profileObj) {
            console.log('Google login successful')
            let email = response.profileObj.email;
            let accessToken = response.accessToken;
            let refreshToken = response.googleId;
            console.log('start login')
            this.props.socialLoginAttempt(email,refreshToken,() => {
                console.log('login done')
                this.props.history.push('/choose-plan')
                console.log('routing done')
            });
        } else {
            console.log('Google Login failed')
        }
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
                        <h4 className='mainTitle'>NUTRITION MADE EASY</h4>
                        <h6 className='subTitle'>LOCAL. ORGANIC. RESPONSIBLE.</h6>
                    </div>
                </div>
                <div className={styles.loginSectionContainer}>
                    <div className={styles.loginSectionItem}>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            isSignedIn={false}
                            disabled={false}
                            cookiePolicy={"single_host_origin"}
                            className={styles.loginSectionInput}
                        />
                    </div>
                    <div className={styles.loginSectionItem}>
                        <input
                            type="text"
                            placeholder="email"
                            className={styles.loginSectionInput}
                            value={this.props.email}
                            onChange={(e) => {
                                this.props.changeEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.loginSectionItem}>
                        <input
                            type="password"
                            placeholder="password"
                            className={styles.loginSectionInput}
                            value={this.props.password}
                            onChange={(e) => {
                                this.props.changePassword(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.buttonContainerItem}>
                        <button
                            className={styles.button}
                            onClick={() => {
                                console.log('start login')
                                this.props.loginAttempt(this.props.email,this.props.password,() => {
                                    console.log('login done')
                                    this.props.history.push('/choose-plan')
                                    console.log('routing done')
                                });
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                    <div className={styles.buttonContainerItem}>
                        <button
                            className={styles.button}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

Landing.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  password: state.login.password,
});

const functionList = {
  changeEmail,
  changePassword,
  loginAttempt,
  socialLoginAttempt,
}

export default connect(mapStateToProps, functionList)(withRouter(Landing));
