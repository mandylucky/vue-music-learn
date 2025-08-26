import {PLAY_MODE,FAVORITE_KEY} from "@/assets/js/constant.js"
import {load} from "@/assets/js/array-store"
const state={
    sequenceList:[],//原始列表
    playlist:[],//播放列表
    playing:false,//是否正在播放
    playMode:PLAY_MODE.sequence,
    currentIndex:0,
    fullScreen:false,//全屏还是缩小
    favoriteList:load(FAVORITE_KEY),//收藏列表
}
export default state