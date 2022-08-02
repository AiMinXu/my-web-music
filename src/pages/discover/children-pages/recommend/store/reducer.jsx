//全部导入不需要一个个导入了
import * as actionTypes from './constants'
import { Map } from 'immutable'


//使用导入的Map包裹数据，使得变成一个immutable对象
//第一次出现网络请求时，给与默认值
const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],
  //注意此处数据为对象
  upRanking: {},
  newRanking: {},
  originRanking: {},
})


//创建reducer以及对外暴露 action更新state
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      //对原数组进行拷贝，将数据放入topBanners中
      // return { ...state, topBanners: action.topBanners }
      //使用set进行修改，set方法使用后会返回一个新的对象
      return state.set('topBanners', action.topBanners)
    case actionTypes.CHANGE_HOT_RECOMMENDS:
      return state.set('hotRecommends', action.hotRecommends)
    case actionTypes.CHANGE_NEW_ALBUMS:
      return state.set('newAlbums', action.newAlbums)

    case actionTypes.CHANGE_UP_RANKING:
      return state.set('upRanking', action.upRanking)
    case actionTypes.CHANGE_NEW_RANKING:
      return state.set('newRanking', action.newRanking)
    case actionTypes.CHANGE_ORIGIN_RANKING:
      return state.set('originRanking', action.originRanking)

    default:
      return state
  }
}
export default reducer
