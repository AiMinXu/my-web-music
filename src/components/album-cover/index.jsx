import React, { memo } from 'react'
import { getSizeImage } from '../../utils/format-utils'
import { AlbumWrapper } from './style'

const XAMAlbumCover = memo((props) => {
  //state 和 props
  // 给定默认值
  const { info, size = 130, width = 153, bgp = '-845px' } = props

  return (
    // 别人在使用组件时，自己定义size，width，gbp数据，实现组件的复用
    <AlbumWrapper size={size} width={width} bgp={bgp}>
      <div className='album-image'>
        <img src={getSizeImage(info.picUrl, size)} alt="" />
        <a href="/todo" className='cover image_cover'>{info.name}</a>
      </div>
      <div className='album-info'>
        <div className='name text-nowrap'>{info.name}</div>
        <div className='artist text-nowrap'>{info.artist.name}</div>
      </div>
    </AlbumWrapper>
  )
})

export default XAMAlbumCover
