import React, { memo, Suspense } from 'react'
//导入Provider
import { Provider } from 'react-redux'
//导入store
import store from './store'
import routes from './router'
import { renderRoutes } from 'react-router-config'


import { HashRouter } from 'react-router-dom'
import XAMAppHeader from './components/app-header'
import XAMAppFooter from './components/app-footer'
import XAMAppPlayerBar from './pages/player/app-player-bar'


const App = memo(() => {
  return (
    // 从redux中引入Provider进行包裹
    <Provider store={store}>
      {/* //HashRouter包裹 */}
      <HashRouter>
        <XAMAppHeader />
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <XAMAppFooter />
        <XAMAppPlayerBar />
      </HashRouter>
    </Provider>
  )
})

export default App
