import _ from 'lodash';
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

var HomepageController = React.createClass({

    render: function () {

        return (
            <secion>
                <h1>Hello World</h1>
            </secion>
        );
    }
});


function mapStateToProps(state) {
    return {
        shows: _.get(state, 'homepage.shows', [])
    };
}

export default connect(mapStateToProps)(HomepageController);