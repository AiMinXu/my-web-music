//recommend发送网络请求封装
import request from './request'

export function getTopBanners() {
  return request({
    url: '/banner'
  })
}

//limit限定传入参数的长度,调用的时候传入
export function getHotRecommends(limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbums(limit) {
  return request({
    url: '/top/album',
    params: {
      limit
    }
  })
}

export function getTopList(idx) {
  return request({
    url: 'toplist/detail',
    params: {
      idx
    }
  })
}
