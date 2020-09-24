import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  bypassLogin,
  changeEmail,
  changePassword,
  loginAttempt,
  socialLoginAttempt,
} from "../../reducers/actions/loginActions";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faShareAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import styles from './landing.module.css'

class Landing extends React.Component {

    constructor() {
        super();
        this.state = {
            mounted: false,
        }
    }

    successLogin = () => {
        this.props.history.push('choose-plan');
    }

    componentDidMount() {
        let queryString = this.props.location.search;
        let urlParams = new URLSearchParams(queryString);
        // Clear Query parameters
        window.history.pushState({}, document.title, window.location.pathname);
        // Automatic log in 
        if(urlParams.has('email') && urlParams.has('hashed')) {
            this.props.bypassLogin(urlParams.get('email'),urlParams.get('hashed'),this.successLogin);
        } else {
            this.setState({
                mounted: true,
            })
        }
    }

    responseGoogle = response => {
        console.log(response);
        if(response.profileObj) {
            // Google Login successful, try to login to MTYD
            console.log('Google login successful')
            let email = response.profileObj.email;
            let accessToken = response.accessToken;
            let refreshToken = response.googleId;
            this.props.socialLoginAttempt(email,refreshToken,this.successLogin);
        } else {
            // Google Login unsuccessful
            console.log('Google Login failed')
        }
    }

    responseFacebook = response => {
        console.log(response);
        if(response.email) {
            console.log('Facebook Login successful');
            let email = response.email;
            let accessToken = response.accessToken;
            let refreshToken = response.id;
            this.props.socialLoginAttempt(email,refreshToken,this.successLogin);
        } else {
            // Facebook Login unsuccessful
            console.log('Facebook Login failed')
        }
    }

    render() {
        if(!this.state.mounted) {
            return null;
        }
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
                                this.props.loginAttempt(this.props.email,this.props.password,() => {
                                    this.props.history.push('/choose-plan')
                                });
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                    <div className={styles.buttonContainerItem}>
                        <Link to='sign-up'>
                            <button
                                className={styles.button}
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={styles.socialLoginItem}>
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
                <div className={styles.socialLoginItem}>
                    <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields={"name,email,picture"}
                        callback={this.responseFacebook}
                        className={styles.loginSectionInput}
                    />
                </div>
            </div>
        )
    }
}

Landing.propTypes = {
  bypassLogin: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  loginAttempt: PropTypes.func.isRequired,
  socialLoginAttempt: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  password: state.login.password,
});

const functionList = {
  bypassLogin,
  changeEmail,
  changePassword,
  loginAttempt,
  socialLoginAttempt,
}

export default connect(mapStateToProps, functionList)(withRouter(Landing));
