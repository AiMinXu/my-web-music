import React, { memo } from 'react'
import XAMTopBanner from './children-components/top-banner'

import XAMHotRecommend from './children-components/hot-recommend'
import XAMNewAlbum from './children-components/new-album'
import XAMRecommendRanking from './children-components/recommend-ranking'
import XAMUserLogin from './children-components/user-login'
import XAMSettleSinger from './children-components/settle-singer'
import XAMHotAchor from './children-components/hot-anchor'
import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style'

const XAMRecommond = memo((props) => {

  return (
    <RecommendWrapper>
      <XAMTopBanner />
      <Content className='wrap-v2'>
        <RecommendLeft>
          <XAMHotRecommend />
          <XAMNewAlbum />
          <XAMRecommendRanking />
        </RecommendLeft>
        <RecommendRight>
          <XAMUserLogin />
          <XAMSettleSinger />
          <XAMHotAchor />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
})

//connect返回的是一个高阶组件，返回高阶组件对XAMRecommon进行包裹
export default XAMRecommond














/* const XAMRecommond = memo((props) => {
  //对props对象进行解构
  const { getBanners, topBanners } = props

  //模拟生命周期，进行请求发送
  useEffect(() => {
    getBanners()
  }, [getBanners])

  return (
    <div>
      <h2>XAMRecommond{topBanners.length}</h2>
    </div>
  )
})
//返回一个对象值为topBanners，传入state---是最外层的数据需要state.recommend.topBanners
const mapStateToProps = state => ({
  topBanners: state.recommend.topBanners
})
//通过传入的dispatch派发封装过的action
const mapDispatchProps = dispatch => ({
  getBanners: () => {
    //派发getTopBannerAction调用后返回的函数，拿到对应数据
    dispatch(getTopBannerAction())
  }
})
//connect返回的是一个高阶组件，返回高阶组件对XAMRecommon进行包裹
export default connect(mapStateToProps, mapDispatchProps)(XAMRecommond)
 */
