import React from 'react';
import { connect } from 'react-redux';
// Import needed actions

// Can also use functional components instead if you do not need to use lifecycle methods

class Landing extends React.Component {
    render() {
        return (
            <div> Will be Landing Page </div>
        );
    }
}

const mapStateToProps = state => ({
    /* Put needed states from store here */
})

export default connect(mapStateToProps, { /* Needed functions from actions*/ })(Landing);