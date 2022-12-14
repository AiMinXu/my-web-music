import React, { memo } from 'react'


import {
  PlayerWrapper,
  PlayerLeft,
  PlayerRight
} from './style';

const XAMPlayer = memo(() => {
  return (
    <PlayerWrapper>
      <div className='content wrap-v2'>
        <PlayerLeft >
          <h2>XAMPlayerInfo</h2>
          <h2>XAMPlayerInfo</h2>
        </PlayerLeft>
        <PlayerRight >
          <h2>XAMPlayerInfo</h2>
          <h2>XAMPlayerInfo</h2>
          <h2>Download</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})

export default XAMPlayer
