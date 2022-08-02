//使用redux-immutable进行合并会转成immutable对象
import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../pages/discover/children-pages/recommend/store'
import { reducer as playerReducer } from '../pages/player/store'
//合并reducer
//combineReducers---内部进行Object.keys(obj)
const Reducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer
})

export default Reducer
