import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import helpers from '../../helpers/helpers.js';

var Login = React.createClass({

    render: function () {

        helpers.logger('[Login] render');

        return (
            <section className="box-row box-login">
                <h1>Login</h1>
                <Link to="/" className="btn btn-selected">Homepage</Link>
            </section>
        );
    }
});


function mapStateToProps(state) {
    return {
        shows: _.get(state, 'homepage.shows', [])
    };
}

export default connect(mapStateToProps)(Login);