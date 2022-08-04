import React from "react"
import { Redirect } from "react-router-dom"

//路由懒加载 React.lazy()
const XAMDiscover = React.lazy(() => import("@/pages/discover"));
const XAMRecommend = React.lazy(_ => import("../pages/discover/children-pages/recommend"));
const XAMRanking = React.lazy(_ => import("../pages/discover/children-pages/ranking"));
const XAMSongs = React.lazy(_ => import("../pages/discover/children-pages/songs"));
const XAMDjradio = React.lazy(_ => import("../pages/discover/children-pages/djradio"));
const XAMArtist = React.lazy(_ => import("../pages/discover/children-pages/artist"));
const XAMAlbum = React.lazy(_ => import("../pages/discover/children-pages/album"));
const XAMPlayer = React.lazy(_ => import("../pages/player"));

const XAMFriend = React.lazy(_ => import("../pages/friend"));
const XAMMine = React.lazy(_ => import("../pages/mine"));

// //导入路由页面配置组件
// import XAMDiscover from "../pages/discover"
// import XAMRecommend from '../pages/discover/children-pages/recommend'
// import XAMAlbum from '../pages/discover/children-pages/album'
// import XAMArtist from '../pages/discover/children-pages/artist'
// import XAMDjradio from '../pages/discover/children-pages/djradio'
// import XAMRanking from '../pages/discover/children-pages/ranking'
// import XAMSongs from '../pages/discover/children-pages/songs'
// import XAMPlayer from '../pages/player/index'

// import XAMMine from "../pages/mine"
// import XAMFriend from "../pages/friend"
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
