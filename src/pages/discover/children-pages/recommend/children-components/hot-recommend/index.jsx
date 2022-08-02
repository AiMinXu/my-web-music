import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { HOT_RECOMMEND_LIMIT } from '@/common/constant'

import { HotRecommendWrapper } from './style'
import XAMSongsCover from '@/components/songs-cover'
import XAMThemeHeaderRCM from '@/components/theme-header-rcm'
import { getHotRecommendAction } from '../../store/actionCreators'

const XAMHotRecommend = memo(() => {
  //state

  //redux-hooks
  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.getIn(['recommend', 'hotRecommends'])
  }), shallowEqual)
  // console.log(hotRecommends);
  const dispatch = useDispatch()

  //其他hooks
  //传入定义的限制常量 HOT_RECOMMEND_LIMIT
  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
  }, [dispatch])


  return (
    <HotRecommendWrapper>
      {/* //传入title keywords */}
      <XAMThemeHeaderRCM title='热门推荐' keywords={['华语', '流行', '民谣', '摇滚', '电子']} />
      <div className='recommend-list'>
        {
          hotRecommends.map((item, index) => {
            return <XAMSongsCover key={item.id} info={item} />
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})

export default XAMHotRecommend
