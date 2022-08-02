
import { getSongDetail } from '@/services/player'

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


//对外暴露的action
export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
})

export const getSongDetailAction = (ids) => {
  return (dispathch, getState) => {//redux-thunk中传入两个参数dispathch, getState
    //根据id查找playList中是否有该歌曲
    const playList = getState().getIn(['player', 'playList'])//从getState中获取playList
    const songIndex = playList.findIndex(song => song.id === ids)//返回值currentIndex未找到为-1


    //判断是否找到及相应方法
    if (songIndex !== -1) {
      dispathch(changeCurrentSongIndexAction(songIndex)) //修改当前歌曲
      const song = playList[songIndex]//根据index取出song
      dispathch(changeCurrentSongAction(song))//改变当前播放歌曲
    } else {
      getSongDetail(ids).then(res => {
        //获取歌曲并判断是否有值
        const song = res.songs && res.songs[0]
        if (!song) return
        // if (!res.songs) return
        // const song = res.songs[0]
        //将请求的歌曲加入播放列表
        const newPlayList = [...playList]//浅拷贝playList
        newPlayList.push(song)

        //更新redux值
        dispathch(changePlayListAction(newPlayList))
        dispathch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispathch(changeCurrentSongAction(song))
      })
    }
  }
}
