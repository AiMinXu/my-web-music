import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Reducer from './reducer'
//配置redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//通过createStore创建store,并使用composeEnhancers进行包裹可以使用redux-devtools
const store = createStore(Reducer, composeEnhancers(
  //使用applyMiddleware包裹thunk
  applyMiddleware(thunk)
))
export default store
