import _ from 'lodash';
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

var Login = React.createClass({

    render: function () {

        console.log('[Login] render');

        return (
            <section className="box-row box-homepage">
                <h1>Login</h1>
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