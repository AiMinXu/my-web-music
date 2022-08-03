import { getSongDetail, getLyric } from '@/services/player'
import { getRandomNumber } from '@/utils/math-utils';
import { parseLyric } from '@/utils/parse-lyric'

import * as actionTypes from './constants'

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})
const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
})
const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PALY_LIST,
  playList
})
const changeLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList
})

//对外暴露的action
export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
})

export const changeCurrentLyricIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  index
})
export const changeCurrentIndexAndSongAction = (tag) => {
  //返回函数是为了拿到dispatch和getState
  return (dispatch, getState) => {
    //通过getState()方法进行getIn获取sequence
    const playList = getState().getIn(['player', 'playList'])
    const sequence = getState().getIn(['player', 'sequence'])
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    switch (sequence) {
      case 1://随机播放
        //随机工具函数使用
        let randomIndex = getRandomNumber(playList.length)
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length);
        }
        currentSongIndex = randomIndex;
        break;
      default://顺序播放
        //获取当前歌曲值，操作播放下一首
        currentSongIndex += tag
        if (currentSongIndex >= playList.length) currentSongIndex = 0
        if (currentSongIndex < 0) currentSongIndex = playList.length
    }
    //获取当前歌曲并改变当前播放歌曲和索引值
    const currentSong = playList[currentSongIndex]
    dispatch(changeCurrentSongAction(currentSong))
    dispatch(changeCurrentSongIndexAction(currentSongIndex))
    // 请求歌词
    dispatch(getLyricAction(currentSong.id));
  }
}

export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {//redux-dispatch, getState
    //根据id查找playList中是否有该歌曲
    const playList = getState().getIn(['player', 'playList'])//从getState中获取playList
    const songIndex = playList.findIndex(song => song.id === ids)//返回值currentIndex未找到为-1

    //判断是否找到及相应方法
    let song = null
    if (songIndex !== -1) {
      dispatch(changeCurrentSongIndexAction(songIndex)) //修改当前歌曲
      song = playList[songIndex]//根据index取出song
      dispatch(changeCurrentSongAction(song))//改变当前播放歌曲
      dispatch(getLyricAction(song.id))
    } else {
      getSongDetail(ids).then(res => {
        //获取歌曲并判断是否有值
        song = res.songs && res.songs[0]
        if (!song) return
        // if (!res.songs) return
        // const song = res.songs[0]
        //将请求的歌曲加入播放列表
        const newPlayList = [...playList]//浅拷贝playList
        newPlayList.push(song)

        //更新redux值
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))
      })
      //请求歌词
      if (!song) return
      dispatch(getLyricAction(song.id));
    }
  }
}

export const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyric = res.lrc.lyric;
      const lyricList = parseLyric(lyric);
      dispatch(changeLyricListAction(lyricList));
    })
  }
}
