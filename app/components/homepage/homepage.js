import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import helpers from '../../helpers/helpers.js';

var Homepage = React.createClass({

    render: function () {

        helpers.logger('[Homepage] render');

        return (
            <section className="box-row box-homepage">
                <h1>Homepage</h1>
                <p>Yep :)</p>
                <Link to="login" className="btn btn-selected">Login</Link>
            </section>
        );
    }
});


function mapStateToProps(state) {
    return {
        shows: _.get(state, 'homepage.shows', [])
    };
}

export default connect(mapStateToProps)(Homepage);