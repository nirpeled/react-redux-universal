import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import iconsConstants from '../../constants/icons-constants.js';

var Homepage = React.createClass({

    render: function () {

        console.log('[Homepage] render');
        
        return (
            <section className="box-row box-homepage">
                <h1>Homepage</h1>
                <Link to="login">Login</Link>
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