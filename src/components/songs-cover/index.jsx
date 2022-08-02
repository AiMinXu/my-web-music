import React, { memo } from 'react'
//引入工具函数
import {
  getSizeImage,
  getCount
} from '@/utils/format-utils'
import { SongsCoverWrapper } from './style'

//抽取专辑封面的公用组
//props从hot-recommend父组件中的redux解构出的hotRecommend传递而来
const XAMSongsCover = memo((props) => {
  // console.log(props);
  const { info } = props
  return (
    <SongsCoverWrapper>
      <div className='cover-top'>
        {/* //工具函数使用 */}
        {/* 优化：图片设定高宽度，固定布局格式，布局的时候不会乱 */}
        <img src={getSizeImage(info.picUrl, 140)} alt="" />
        {/* <img src={info.picUrl} alt="" /> */}
        <div className='cover sprite_covor'>
          <div className='info sprite_cover'>
            <span>
              <i className='sprite_icon erji'></i>
              {/* {info.playCount} */}
              {getCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className='cover-bottom'>
        {info.name}
      </div>
      {/* <div className='cover-source text-nowrap'>
        by {info.copywriter || info.creator.nickname}
        {info.copywriter}
      </div> */}
    </SongsCoverWrapper>
  )
})

export default XAMSongsCover
