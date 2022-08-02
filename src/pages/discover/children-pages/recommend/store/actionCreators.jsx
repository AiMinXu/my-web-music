//发送网络请求模块


import * as actionTypes from './constants'
//导入发送请求的函数
import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopList
} from '@/services/recommend'

//返回的是一个对象,type,topBanners
const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  //取出banners数据
  topBanners: res.banners
})
//返回的是一个result
const changeHotRecommendsAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMENDS,
  //取出recommend数据
  hotRecommends: res.result
})
const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUMS,
  //取出newAlbums数据
  newAlbums: res.albums
})
const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist
})
const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist
})
const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist
})


//创建获取banner的action
export const getTopBannerAction = () => {
  return dispatch => {
    //拿到数据后进行.then中dispatch()分发action进行调用传入res
    getTopBanners().then(res => {
      dispatch(changeTopBannerAction(res))
      // console.log(changeTopBannerAction(res));
    })
  }
}
//创建获取hotRecommend的action，调用services/recommend里封装的getHotRecommends()
//传入limit
export const getHotRecommendAction = (limit) => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
      dispatch(changeHotRecommendsAction(res))
      // console.log(res);
    })
  }
}
//创建获取NewAlbum的action
// export const getNewAlbumAction = (limit) => {
//   return dispatch => {
//     getNewAlbums(limit).then(res => {
//       dispatch(changeNewAlbumAction(res))
//       // console.log(res);
//     })
//   }
// }
export const getNewAlbumAction = (limit) => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      // const albums = res.albums
      //dispatch出去一个对象
      dispatch(changeNewAlbumAction(res))
      // console.log(res);
    })
  }
}
//获取榜单数据
export const getTopListAction = (idx) => {
  return dispatch => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 0:
          dispatch(changeUpRankingAction(res));
          break;
        case 2:
          dispatch(changeNewRankingAction(res));
          break;
        case 3:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
      }
    })
  }
}
