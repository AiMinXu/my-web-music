import React, { memo, useEffect } from 'react'

// import { shallowEqual, useDispatch, useSelector } from 'react-redux'
// import { getTopList } from '@/services/recommend'
import XAMThemeHeaderRCM from '@/components/theme-header-rcm'

// import XAMTopRanking from '@/components/top-ranking'
import { RankingWrapper } from './style'
// import { getTopListAction } from '../../store/actionCreators'

const XAMRecommendRanking = memo(() => {
  //state  props

  //redux-hook
  // const { upRanking, newRanking, originRanking } = useSelector(state => ({
  //   upRanking: state.getIn('recommend', 'upRanking'),
  //   newRanking: state.getIn('recommend', 'newRanking'),
  //   originRanking: state.getIn('recommend', 'originRanking')
  // }), shallowEqual)
  // const dispatch = useDispatch()

  //其他hooks
  // useEffect(() => {
  //   dispatch(getTopListAction(0))
  //   dispatch(getTopListAction(2))
  //   dispatch(getTopListAction(3))
  // }, [dispatch])
  return (
    <RankingWrapper>
      <XAMThemeHeaderRCM title='榜单' />
      {/* <div className='tops'>
        <XAMTopRanking info={upRanking} />
        <XAMTopRanking info={newRanking} />
        <XAMTopRanking info={originRanking} />
      </div> */}
    </RankingWrapper>
  )
})

export default XAMRecommendRanking
