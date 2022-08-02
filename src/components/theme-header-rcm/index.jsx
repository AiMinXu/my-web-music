//recommend上部公共组件
import React, { memo } from 'react'
//引入PropTypes进行校验
import PropTypes from 'prop-types'
import { HeaderWrapper } from './style'

//定义歌单标题栏公共组件
//通过redux中取出数据，解构hotRecommend通过props传递数据
const XAMThemeHeaderRCM = memo((props) => {
  //
  const { title, keywords } = props
  return (
    <HeaderWrapper className='sprite_02'>
      <div className='left'>
        <h3 className='title'>{title}</h3>
        <div className='keyword'>
          {
            keywords.map((item, index) => {
              return (
                <div className='item' key={item}>
                  <a href="待填充">{item}</a>
                  <span className='divider'>|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='right'>
        <a href="待填充">更多</a>
        <i className='icon sprite_02'></i>
      </div>
    </HeaderWrapper>
  )
})
//传入PropTypes限制数据类型
XAMThemeHeaderRCM.PropTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.array
}
//给定默认值
XAMThemeHeaderRCM.defaultProps = {
  keywords: []
}

export default XAMThemeHeaderRCM
