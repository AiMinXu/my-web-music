import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumAction } from '../../store/actionCreators'

import { Carousel } from 'antd'
import XAMThemeHeaderRCM from '@/components/theme-header-rcm'
import XAMAlbumCover from '@/components/album-cover'
import { AlbumWrapper } from './style'


const XAMNewAlbum = memo(() => {
  //使用useState()本地管理数据
  // const [albums, setAlbums] = useState([])


  //redux hooks
  //shallowEqual对于返回的数据进行浅层比较，性能优化
  const { newAlbums } = useSelector(state => ({
    newAlbums: state.getIn(["recommend", "newAlbums"])
  }), shallowEqual)
  // console.log(newAlbums);
  const dispatch = useDispatch()

  //其他hook
  const pageRef = useRef()
  //useEffect()发送网络请求，请求数据
  useEffect(() => {
    dispatch(getNewAlbumAction(10))
  }, [dispatch])
  //测试对应网络数据是否完好--->控制查看
  // useEffect(() => {
  //   getNewAlbums(10).then(res => {
  //     console.log(res);
  //     // setAlbums(res.albums)
  //   })
  // }, [])

  return (
    <AlbumWrapper>
      <XAMThemeHeaderRCM title='新碟上架' />
      <div className='content'>
        {/* onClick={e => pageRef.current.prev()}调用前一个  */}
        <button className='arrow arrow-left sprite_02' onClick={e => pageRef.current.prev()}></button>
        <div className='album'>
          {/* //使用antd轮播图组件 */}
          {/* 打上Ref监听点击事件 */}
          <Carousel dot={false} ref={pageRef}>
            {/* 设定[0,1]数组进行map.通过计算取得每页的数量  */}
            {[0, 1].map(item => {
              return (
                <div key={item} className='page'>
                  {
                    newAlbums.slice(item * 5, (item + 1) * 5).map(item => {
                      return <XAMAlbumCover key={item.id} info={item} size={100} width={118} bgp='-570px' />
                    })
                  }
                </div>
              )
            })}
          </Carousel>
        </div>
        {/* onClick={e => pageRef.current.next()}调用后一个 */}
        <button className='arrow arrow-right sprite_02' onClick={e => pageRef.current.next()}></button>
      </div>
    </AlbumWrapper>
  )
})

export default XAMNewAlbum
