import {createStore} from 'redux';
import {reducer,reducer2,reducer3} from '../Reducer'
import {combineReducers} from 'redux'
const myreducer=combineReducers({
	changetitleReducer:reducer,
	changeSearchReducer:reducer2,
	changevalueReducer:reducer3
})

import thunk from 'redux-thunk'; //引入中间件 做异步请求
import {applyMiddleware,compose} from "redux";//在使用redux tools时要引入compose
import promiseMiddleware from 'redux-promise';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(myreducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk,promiseMiddleware)))
// const store=createStore(myreducer,applyMiddleware(thunk,promiseMiddleware));

export default store;