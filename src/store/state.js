import {PLAY_MODE} from "@/assets/js/constant.js"
const state={
    sequenceList:[],//原始列表
    playlist:[],//播放列表
    playing:false,//是否正在播放
    playMode:PLAY_MODE.sequence,
    currentIndex:0,
    fullScreen:false,//全屏还是缩小

}
export default state