//react
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
//工具
import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils'
import {
  getSongDetailAction,
  changeSequenceAction,
  changeCurrentIndexAndSongAction,

} from '../store/actionCreators';
//路由+组件（第三方组件）+样式
import { NavLink } from 'react-router-dom';
import { Slider } from 'antd';
import {
  PlaybarWrapper,
  PlayInfo,
  Operator,
  Control
} from './style'
// import { set } from 'immutable';

const XAMAppPlayerBar = memo(() => {
  //state  props
  const [currentTime, setCurrentTime] = useState(0)//设置歌曲播放进度时间
  const [progress, setProgress] = useState(0)//进度时间需要改变不是常量
  const [isChanging, setIsChanging] = useState(false)//监听当前是否正在发生改变
  const [isPlaying, setIsPlaying] = useState(false)//设置当前正在 播放状态
  //redux的hooks
  const { currentSong, sequence } = useSelector(state => ({
    currentSong: state.getIn(['player', 'currentSong']),//immutable()
    sequence: state.getIn(['player', 'sequence'])//immutable()
  }), shallowEqual)
  const dispatch = useDispatch()

  //其他hooks
  const audioRef = useRef()
  //发送网络请求
  useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch])
  useEffect(() => {
    //第一次需要设置src，当src改变时再改变
    audioRef.current.src = getPlaySong(currentSong.id)
    //根据返回的promise值进行设置切换下一首是否播放（请求不到的歌曲）
    audioRef.current.play().then(res => {
      setIsPlaying(true);
    }).catch(err => {
      setIsPlaying(false);
    });
  }, [currentSong])
  //other
  const picUrl = (currentSong.al && currentSong.al.picUrl) || ''//判断picUrl是否有值，并给默认值
  const singerName = (currentSong.ar && currentSong.ar[0].name) || '未知歌手'
  const songName = (currentSong.name) || '未知歌曲'
  const duration = currentSong.dt || "00:00"
  const showDuration = formatDate(duration, "mm:ss")
  const showCurrentTime = formatDate(currentTime, "mm:ss")

  //handles function
  //palyMusic单独设置 useCallback()进行包裹
  const palyMusic = useCallback(() => {
    //根据状态判断调用onClick()为什么操作
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying) //改变播放状态
  }, [isPlaying])

  const timeUpdate = (e) => {
    if (!isChanging) {//判断是否在改变，不在改变则设置进度
      //获取当前播放的时间--秒
      setCurrentTime(e.target.currentTime * 1000)//转化为毫秒
      setProgress(currentTime / duration * 100)
    }
  }
  const handleMusicEnded = (e) => {
    //判断状态
    if (sequence === 2) {//单曲循环的时候
      //播放时长设置为0，并调用播放方法
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      dispatch(changeCurrentIndexAndSongAction(1))
    }
  }
  const changeSequences = () => {
    let currentSequence = sequence + 1
    // if(currentSequence === 3) currentSequence = 0
    if (currentSequence > 2) { currentSequence = 0 }
    dispatch(changeSequenceAction(currentSequence))
  }
  //传过来标记，利用标记进行判断点击为上一首还是下一首
  const changeMusic = (tag) => {
    dispatch(changeCurrentIndexAndSongAction(tag))
  }


  //useCallback()使用---当把回调函数传入自定义组件中，为避免发生不断重绘问题，需用useCallback()，注意依赖项
  const sliderChange = useCallback((value) => {
    setIsChanging(true)//改变时设置为true
    const currentTime = value / 100 * duration //获取当前松手的进度条播放时间
    setCurrentTime(currentTime)
    setProgress(value)
  }, [duration])
  const sliderAfterChange = useCallback((value) => {
    const currentTime = value / 100 * duration / 1000 //获取当前松手的进度条播放时间
    audioRef.current.currentTime = currentTime //设置audio的播放时间
    setCurrentTime(currentTime * 1000) //松手后重新设置时间，注意*1000设置成毫秒数
    setIsChanging(false)//该为false
    //判断当前是否在播放状态，不在松手后就调用playMusic
    if (!isPlaying) {
      palyMusic()
    }
  }, [duration, palyMusic, isPlaying])


  return (
    <PlaybarWrapper className="sprite_player">
      <div className='content wrap-v2'>
        {/* 传入isPlaying属性进行当前状态判断，设置不同背景图  */}
        <Control isPlaying={isPlaying}>
          <button className='sprite_player prev' onClick={e => changeMusic(-1)}></button>
          <button className='sprite_player play' onClick={e => palyMusic()}></button>
          <button className='sprite_player next' onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt="未知" />
            </NavLink>
          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{songName}</span>
              <a href='/#' className='singer-name'>{singerName}</a>
            </div>
            <div className='progress'>
              {/* 设置滚动条的时间  value属性 */}
              <Slider
                defaultValue={30}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className='time'>
                <span className='now-time'>{showCurrentTime}</span>
                <span className='divider'>/</span>
                <span className='duration'>{showDuration}</span>
              </div>
            </div>
          </div>
          <div className='image'></div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className='left'>
            <button className='sprite_player btn favor'></button>
            <button className='sprite_player btn share'></button>
          </div>
          <div className='right sprite_player'>
            <button className='sprite_player btn volume'></button>
            <button className='sprite_player btn loop' onClick={e => changeSequences()}></button>
            <button className='sprite_player btn playlist'></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnded} />
    </PlaybarWrapper>
  )
})

export default XAMAppPlayerBar
