import React, { memo, } from 'react'
import { renderRoutes } from 'react-router-config'
import { dicoverMenu } from '@/common/local-data'
import {
  DiscoverWrapper,
  TopMenu,
} from './style'
import { NavLink } from 'react-router-dom'
//discover组件
const XAMDiscover = memo((props) => {

  //获取route
  const { route } = props
  //结构
  return (
    //设定discoverWrapper
    <DiscoverWrapper>
      <div className='top'>
        <TopMenu className='wrap-v1 '>
          {
            dicoverMenu.map((item, index) => {
              return (
                <div className='item' key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>
      {/*       //使用renderRoutes就会有route属性，会被添加到props里面
      //通过renderRoutes渲染SwitchRoutes后，可以通过route.routes取到里面的routes */}
      {renderRoutes(route.routes)}
    </DiscoverWrapper>
  )
})

export default XAMDiscover
