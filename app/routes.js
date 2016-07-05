import React from 'react';
import { Route, Link, IndexRoute } from 'react-router';

import RootContainer from './containers/root/root-container.js';
import Homepage from './components/homepage/homepage.js';
import Login from './components/login/login.js';

export default (
    <Route path="/" component={RootContainer}>
        <IndexRoute component={Homepage}/>
        <Route path="login" component={Login}/>
    </Route>
);
