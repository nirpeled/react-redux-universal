import _ from 'lodash';
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import iconsConstants from '../../constants/icons-constants.js';

var HomepageController = React.createClass({

    render: function () {

        return (
            <section className="box-row box-homepage">
                <h1>Homepage <i className={iconsConstants.INFO} /></h1>
            </section>
        );
    }
});


function mapStateToProps(state) {
    return {
        shows: _.get(state, 'homepage.shows', [])
    };
}

export default connect(mapStateToProps)(HomepageController);