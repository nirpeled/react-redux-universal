import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/root-reducer.js';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

var store;

export default {

    init(initialState) {
        store = createStoreWithMiddleware(rootReducer, initialState);
    },

    get() {
        return store;
    }

}
