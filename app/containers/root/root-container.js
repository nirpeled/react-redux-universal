import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import styles from '../../styles.js';

var RootContainer = React.createClass({

    render: function() {

        return (

            <html>

                <head>
                    <title>Hello World</title>
                </head>

                <body>

                    <main>

                        {this.props.children}

                    </main>

                    <script>var __config = null;</script>
                    <script>var __state = null;</script>
                    <script src="/scripts/vendor.bundle.js"></script>
                    <script src="/scripts/bundle.js"></script>

                </body>

            </html>
        );
    }

});

function mapStateToProps(state) {
    return {
        location: _.get(state, 'location')
    };
}

export default connect(mapStateToProps)(RootContainer);