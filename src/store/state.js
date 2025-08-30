import {PLAY_MODE, SEARCH_KEY} from "@/assets/js/constant.js"
import {load} from "@/assets/js/array-store"
const state={
    sequenceList:[],//原始列表
    playlist:[],//播放列表
    playing:false,//是否正在播放
    playMode:PLAY_MODE.sequence,
    currentIndex:0,
    fullScreen:false,//全屏还是缩小
    favoriteList:[],//收藏列表
    searchHistory:load(SEARCH_KEY),
    playHistory:[]
}
export default state