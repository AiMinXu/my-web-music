//导入第三方库
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
//从redux中导入connect
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

//导入功能性方法等
//导入封装的获取banner的action
import { getTopBannerAction } from '../../store/actionCreators'

//导入组件
import { Carousel } from 'antd';
import {
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl
} from './style'
const XAMTopBanner = memo(() => {
  //state
  const [curIndex, setCurIndex] = useState(0)

  //组件和redux关联:获取数据和进行操作
  //获取dispatch---useDispatch()
  const dispatch = useDispatch()
  //获取数据--useSelector(),传入两个参数  (回调函数具有返回值返回一个对象),
  //第二个参数--判断是否进行浅层比较(qualityFn?: ((left: unknown, right: unknown) => boolean) | undefined): unknown)
  //直接对回调函数的返回结果进行解构
  const { topBanners } = useSelector((state) => ({
    //回调函数返回值,使用immutable的get方法获取数据，不能通过原先的.方法直接获取
    // topBanners: state.get('recommend').get('topBanners')
    topBanners: state.getIn(['recommend', 'topBanners'])
  }), shallowEqual)

  //hooks
  //发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])//dispatch导致当前组件重新渲染的依赖
  //获取轮播图组件
  const bannerRef = useRef()
  //使用useCallback进行回调函数声明，指向同一个引用
  const bannerChange = useCallback((from, to) => {
    setTimeout(() => {
      setCurIndex(to)
    }, 0);
  }, [])

  //其他业务逻辑
  const bgImage = topBanners[curIndex] &&  (topBanners[curIndex].imageUrl + "?imageView&blur=40x20")

  //jsx
  return (
    //添加bgimage属性
    <BannerWrapper bgImage={bgImage}>
      <div className='banner wrap-v2'>
        <BannerLeft>
          {/* //打上ref标识 */}
          <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
            {
              topBanners.map((item, index) => {
                return (
                  <div className='banner-item' key={item.imageUrl}>
                    <img className='image' src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className='btn left' onClick={e => bannerRef.current.prev()}></button>
          <button className='btn right' onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})

export default XAMTopBanner
