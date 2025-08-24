<script setup>
import { computed,ref,defineProps,onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import { getSingerDetail } from '@/service/singer';
import { processSongs } from "@/service/song";
import musicList from "@/components/music-list/music-list.vue";
import storage from 'good-storage'
import {SINGER_KEY} from "@/assets/js/constant.js"
const songs=ref([]);
const route=useRoute();
const router=useRouter();
let loading=ref(true);
const props=defineProps({
    singer:{
        type:Object,
        default(){
            return {}
        }
    }
})

const singer=computed(()=>{
    let ret=null;
    const singer=props.singer;
    if(singer){
        ret=singer
    }else{
        const cacheSinger=storage.session.get(SINGER_KEY);
        if(cacheSinger && cacheSinger.mid ==route.params.id ){
            ret=cacheSinger
        }
    }
    return ret
})
const pic=computed(()=>{
    const singerVal=singer.value
    return singerVal && singerVal.pic;
})
const title=computed(()=>{
    const singerVal=singer.value
    return singerVal && singerVal.name;
})

onMounted(async ()=>{
  const singerVal=singer.value;
  if(!singerVal){
    const path=route.matched[0].path;
    router.push({
        path
    })
    return;
  }
  const result = await getSingerDetail(singerVal);
  const res = await processSongs(result.songs);
  //  服务端代码异常临时处理 star 
  songs.value=res.length?
  res:
  [
            {
                "id": 680056,
                "mid": "000ruq2M3hZIAO",
                "name": "A.I.N.Y.",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 226,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000HZzEx0QIMNM.jpg?max_age=2592000",
                "album": "18..."
            },
            {
                "id": 583457043,
                "mid": "004T76aL12SPYA",
                "name": "红蔷薇白玫瑰",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 285,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 583457045,
                "mid": "003wOZ153AZqvG",
                "name": "光年之外",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 234,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 583457040,
                "mid": "004AjR6r33HW29",
                "name": "Where Did U Go",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 234,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 583457038,
                "mid": "0044Z0FY0zszuS",
                "name": "泡沫",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 258,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 104900108,
                "mid": "003VBvPl0rUiEo",
                "name": "于是",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 229,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003c616O2Zlswm.jpg?max_age=2592000",
                "album": "新的心跳"
            },
            {
                "id": 583457051,
                "mid": "004LU05o0fJHnS",
                "name": "我的秘密",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 249,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 583457041,
                "mid": "004ZpCzP1noeAN",
                "name": "A.I.N.Y. 爱你",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 227,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 583457047,
                "mid": "0013Is6j2bhOky",
                "name": "天空没有极限 (粤)",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 279,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 4969615,
                "mid": "002w13LS0dkKLg",
                "name": "你把我灌醉",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 285,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000mmrVb4fam2C.jpg?max_age=2592000",
                "album": "The Best of G.E.M. 2008-2012"
            },
            {
                "id": 5215858,
                "mid": "000veEVG2hakIS",
                "name": "龙卷风",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 271,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000001UyUjq2QzMMF.jpg?max_age=2592000",
                "album": "我是歌手第二季 第9期"
            },
            {
                "id": 7060463,
                "mid": "003de5C906SZp9",
                "name": "后会无期",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 223,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000001axO7402nnGG.jpg?max_age=2592000",
                "album": "后会无期 电影原声带"
            },
            {
                "id": 583457049,
                "mid": "003kuWGW4ZmEHP",
                "name": "喜欢你",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 242,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 583457044,
                "mid": "000ew8030c2YQe",
                "name": "画",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 176,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 583457042,
                "mid": "0008INNd2PlEmW",
                "name": "回忆的沙漏",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 232,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 215643057,
                "mid": "001laz0a1DXry2",
                "name": "另一个童话",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 183,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003cKIKZ1J4Yyu.jpg?max_age=2592000",
                "album": "另一个童话"
            },
            {
                "id": 583457048,
                "mid": "003EUD6v3xFpAW",
                "name": "后会无期",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 222,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 224111860,
                "mid": "001A9o5D1EWzyd",
                "name": "岩石里的花",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 294,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003w92u63Kz75u.jpg?max_age=2592000",
                "album": "睡皇后"
            },
            {
                "id": 447628,
                "mid": "004RMta54eFUxQ",
                "name": "睡公主",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 282,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003FBC9b4XV8i9.jpg?max_age=2592000",
                "album": "G.E.M."
            },
            {
                "id": 104907046,
                "mid": "004H7iKt1VFmgr",
                "name": "盲点",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 226,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003c616O2Zlswm.jpg?max_age=2592000",
                "album": "新的心跳"
            },
            {
                "id": 680058,
                "mid": "0027JQ9o3nXpxQ",
                "name": "Mascara",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 245,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000HZzEx0QIMNM.jpg?max_age=2592000",
                "album": "18..."
            },
            {
                "id": 680057,
                "mid": "001upWVM42iOns",
                "name": "我不懂爱",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 213,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000HZzEx0QIMNM.jpg?max_age=2592000",
                "album": "18..."
            },
            {
                "id": 104235813,
                "mid": "004TokQO007a8m",
                "name": "瞬间",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 246,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003c616O2Zlswm.jpg?max_age=2592000",
                "album": "新的心跳"
            },
            {
                "id": 104895861,
                "mid": "0002u2Oo481kUb",
                "name": "一路逆风",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 225,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003c616O2Zlswm.jpg?max_age=2592000",
                "album": "新的心跳"
            },
            {
                "id": 215643056,
                "mid": "0040Cail3KjtDm",
                "name": "错过不错",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 238,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003cKIKZ1J4Yyu.jpg?max_age=2592000",
                "album": "另一个童话"
            },
            {
                "id": 203359767,
                "mid": "004eqA3C2i5jxw",
                "name": "爱你 A.I.N.Y. 2017",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 240,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000041XCLi3ACp0U.jpg?max_age=2592000",
                "album": "爱你 A.I.N.Y. 2017"
            },
            {
                "id": 736922,
                "mid": "001W4s2i2akSvC",
                "name": "寂寞星球的玫瑰",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 287,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000002F059l1kCcdr.jpg?max_age=2592000",
                "album": "My Secret"
            },
            {
                "id": 583457046,
                "mid": "002gNo1K2bbXBg",
                "name": "睡公主",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 291,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M0000019VvQv1htecA.jpg?max_age=2592000",
                "album": "I AM GLORIA"
            },
            {
                "id": 1530863,
                "mid": "003HQTlP2aiiM3",
                "name": "奇迹",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 231,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000002YFufr4bXZyI.jpg?max_age=2592000",
                "album": "Xposed"
            },
            {
                "id": 218269406,
                "mid": "000zBURs2OgW6n",
                "name": "那一夜",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 234,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000Qy6FL03pkEU.jpg?max_age=2592000",
                "album": "毒苹果"
            },
            {
                "id": 224528315,
                "mid": "0017rouV01H3u7",
                "name": "光年之外",
                "singer": "G.E.M. 邓紫棋/艾热AIR",
                "url": "",
                "duration": 217,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000002YAM6K2f4hWJ.jpg?max_age=2592000",
                "album": "光年之外 (热爱版)"
            },
            {
                "id": 218269407,
                "mid": "004U9xDR1PuOPX",
                "name": "毒苹果",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 251,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000Qy6FL03pkEU.jpg?max_age=2592000",
                "album": "毒苹果"
            },
            {
                "id": 105972454,
                "mid": "001mZ3iA0naCQ9",
                "name": "有心人",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 239,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000FyZ4M1bYVm8.jpg?max_age=2592000",
                "album": "有心人"
            },
            {
                "id": 218269408,
                "mid": "003r7EDv3uLKM8",
                "name": "突然之间",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 200,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000Qy6FL03pkEU.jpg?max_age=2592000",
                "album": "毒苹果"
            },
            {
                "id": 7263208,
                "mid": "0025hBWh3F7iVS",
                "name": "All About U",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 243,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000000HZzEx0QIMNM.jpg?max_age=2592000",
                "album": "18..."
            },
            {
                "id": 127531492,
                "mid": "000o3E6H3UA8f8",
                "name": "Dark Horse",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 7,
                "pic": "https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000",
                "album": ""
            },
            {
                "id": 104918453,
                "mid": "000r5wUp0pmhqH",
                "name": "查克靠近",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 260,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003c616O2Zlswm.jpg?max_age=2592000",
                "album": "新的心跳"
            },
            {
                "id": 211889247,
                "mid": "003BBDlj3apipE",
                "name": "Victoria",
                "singer": "G.E.M. 邓紫棋",
                "url": "",
                "duration": 216,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000001I3LHr3rxd65.jpg?max_age=2592000",
                "album": "Victoria"
            }
  ]
  // 服务端代码异常临时处理 end
  // songs.value=res;
  loading.value=false;
})


</script>
<template>
    <div class="singer-detail">
      <music-list 
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
      >
    </music-list>
    </div>
</template>
<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
