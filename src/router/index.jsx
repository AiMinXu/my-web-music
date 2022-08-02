import React from "react"
import { Redirect } from "react-router-dom"
//导入路由页面配置组件
import XAMDiscover from "../pages/discover"
import XAMRecommend from '../pages/discover/children-pages/recommend'
import XAMAlbum from '../pages/discover/children-pages/album'
import XAMArtist from '../pages/discover/children-pages/artist'
import XAMDjradio from '../pages/discover/children-pages/djradio'
import XAMRanking from '../pages/discover/children-pages/ranking'
import XAMSongs from '../pages/discover/children-pages/songs'
import XAMPlayer from '../pages/player/index'

import XAMMine from "../pages/mine"
import XAMFriend from "../pages/friend"
//配置路由
//path与component一一对应
const routes = [
  {
    path: "/",
    exact: true,//开启严格匹配
    // component: XAMDiscover
    //render  Redirect进行重定向
    render: () => (
      <Redirect to="/discover" />
    )
  },
  {
    //发现音乐
    path: "/discover",
    // exact: true,//开启严格匹配
    component: XAMDiscover,
    //配置discover下面的二级路由
    routes: [
      //重定向
      {
        path: "/discover",
        exact: true,//开启严格匹配
        render: () => (
          <Redirect to="/discover/recommend" />
        )
      },
      {
        path: '/discover/recommend',
        component: XAMRecommend
      },
      {
        path: '/discover/album',
        component: XAMAlbum
      },
      {
        path: '/discover/artist',
        component: XAMArtist
      },
      {
        path: '/discover/djradio',
        component: XAMDjradio
      },
      {
        path: '/discover/ranking',
        component: XAMRanking
      },
      {
        path: '/discover/songs',
        component: XAMSongs
      },
      {
        path: '/discover/player',
        component: XAMPlayer
      },
    ]
  },
  {
    path: "/mine",
    // exact: true,//开启严格匹配
    component: XAMMine
  },
  {
    path: "/friend",
    // exact: true,//开启严格匹配
    component: XAMFriend
  },
]
export default routes;
