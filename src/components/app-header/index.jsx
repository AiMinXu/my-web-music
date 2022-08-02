import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { headerLinks } from '@/common/local-data'//定义阅读
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight
} from './style'



const XAMAppHeader = memo(() => {

  // 业务代码
  // 创建showSelectItem方法用于判断遍历渲染的数据
  const showSelectItem = (item, index) => {
    //判断index的值是否为前三个
    if (index < 3) {
      return (
        //取出link  添加exact进行严格匹配
        //i标签使用小三角形精灵图
        <NavLink to={item.link} exact>{item.title} <i className='sprite_01 icon'></i></NavLink>
      )
    } else {
      //取出link，此处为超链接放入a标签中
      return <a href={item.link}>{item.title}</a>
    }
  }
  return (
    <HeaderWrapper>
      <div className='content wrap-v1'>
        {/* //header左侧 */}
        <HeaderLeft>
          {/* 解决办法：1.配置eslint把对应的警告删除，2.给空格，***3给文字，在样式中将text-indent：首行缩进调到最小-9999px*** */}
          <a href="#/discover" className='logo sprite_01'>网易云音乐</a>
          {/* //进行遍历取得数据 */}
          <div className='select-list'>
            {
              headerLinks.map((item, index) => {
                return (
                  <div key={item.title} className='select-item'>
                    {showSelectItem(item, index)}
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        {/* //header右侧 */}
        <HeaderRight>
          {/* 输入框，以及图标引入 */}
          {/* prefix前缀 用于加载搜索框之前，样式*/}
          <Input className='search' placeholder='音乐/视频/电台/用户' prefix={<SearchOutlined />} />
          {/* 后续监听div点击 */}
          <div className='center'>创作者中心</div>
          <div className='login'>登录</div>
        </HeaderRight>
      </div>
      <div className='divider'></div>
    </HeaderWrapper>
  )
})

export default XAMAppHeader
