<template>
  <div
    ref="rootRef"
    class="suggest"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-if="singer"
        @click="selectSinger(singer)"
      >
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{song.singer}}-{{song.name}}
          </p>
        </div>
      </li>
      <div
        class="suggest-item"
        v-loading:[loadingText]="pullUpLoading"
      ></div>
    </ul>
  </div>
</template>

<script>
  import { ref, watch, computed, nextTick } from 'vue'
  import { search } from '@/service/search'
  import { processSongs } from '@/service/song'
  import usePullUpLoad from './use-pull-up-load'

  export default {
    name: 'suggest',
    props: {
      query: String,
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    emits: ['select-song', 'select-singer'],
    setup(props, { emit }) {
      const singer = ref(null)
      const songs = ref([])
      const hasMore = ref(true)
      const page = ref(1)
      const loadingText = ref('')
      const noResultText = ref('抱歉，暂无搜索结果')
      const manualLoading = ref(false)

      const loading = computed(() => {
        return !singer.value && !songs.value.length
      })

      const noResult = computed(() => {
        return !singer.value && !songs.value.length && !hasMore.value
      })

      const pullUpLoading = computed(() => {
        return isPullUpLoad.value && hasMore.value
      })

      const preventPullUpLoad = computed(() => {
        return loading.value || manualLoading.value
      })

      const { isPullUpLoad, rootRef, scroll } = usePullUpLoad(searchMore, preventPullUpLoad)

      watch(() => props.query, async (newQuery) => {
        if (!newQuery) {
          return
        }
        await searchFirst()
      })

      async function searchFirst() {
        if (!props.query) {
          return
        }
        page.value = 1
        songs.value = []
        singer.value = null
        hasMore.value = true

        const result = await search(props.query, page.value, props.showSinger)
        if(result && result.songs){
          songs.value = await processSongs(result.songs)
        }else{
          songs.value = [
            {
                "id": 575826329,
                "mid": "0003Bw0J1Q5Bhx",
                "name": "桃花诺",
                "singer": "王靖雯/Big Cole",
                "url": "",
                "duration": 203,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000002ony6D1FJXqH.jpg?max_age=2592000",
                "album": "桃花诺 (说唱版)"
            },
            {
                "id": 270725054,
                "mid": "000xmgRp0nuQbv",
                "name": "我没资格",
                "singer": "王靖雯",
                "url": "",
                "duration": 15,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003UZGl92kO6EV.jpg?max_age=2592000",
                "album": "王靖雯的电台"
            },
            {
                "id": 567064729,
                "mid": "001JpQpy45C2H6",
                "name": "樱花草",
                "singer": "王北车/王靖雯",
                "url": "",
                "duration": 246,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000004FXPLy3GZCKx.jpg?max_age=2592000",
                "album": "百分百歌手·对战季 第3期"
            },
            {
                "id": 571067237,
                "mid": "002imToI2kxbfu",
                "name": "一个人想着一个人",
                "singer": "王靖雯",
                "url": "",
                "duration": 232,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M00000003Wch3wetWH.jpg?max_age=2592000",
                "album": "忘记我"
            },
            {
                "id": 273978378,
                "mid": "002iibAH1cc7jQ",
                "name": "我有多么爱你",
                "singer": "王靖雯",
                "url": "",
                "duration": 17,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003UZGl92kO6EV.jpg?max_age=2592000",
                "album": "王靖雯的电台"
            },
            {
                "id": 571067207,
                "mid": "000hKUgb0B5ofj",
                "name": "爱自己更深",
                "singer": "王靖雯",
                "url": "",
                "duration": 210,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M00000003Wch3wetWH.jpg?max_age=2592000",
                "album": "忘记我"
            },
            {
                "id": 337363140,
                "mid": "001cLq8k2s4Rn4",
                "name": "Forever Young",
                "singer": "李玉刚/杨丞琳/苏见信 (信)/尚雯婕/Lil Ghost小鬼/张碧晨/JA符龙飞/胡宇桐/焦迈奇/金润吉/李润祺/梁龙/刘逸云 Amber Liu/马伯骞Victor Ma/品冠/唐汉霄/王靖雯/吴莫愁/萧敬腾/杨坤/张楚/张震岳/周洁琼/周晓鸥/朱星杰/张亚东",
                "url": "",
                "duration": 284,
                "pic": "https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000",
                "album": ""
            },
            {
                "id": 127589020,
                "mid": "001TCFQs2s1nv1",
                "name": "手心的蔷薇",
                "singer": "王靖雯",
                "url": "",
                "duration": 15,
                "pic": "https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000",
                "album": ""
            },
            {
                "id": 580125010,
                "mid": "003669iI00N1we",
                "name": "催眠术",
                "singer": "王靖雯",
                "url": "",
                "duration": 204,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000004GfIih0Hojt9.jpg?max_age=2592000",
                "album": "催眠术"
            },
            {
                "id": 295599100,
                "mid": "001Ra8Wk2RkzhS",
                "name": "万拒",
                "singer": "王靖雯",
                "url": "",
                "duration": 14,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003UZGl92kO6EV.jpg?max_age=2592000",
                "album": "王靖雯的电台"
            },
            {
                "id": 368361930,
                "mid": "003fO1dy1bw6cl",
                "name": "再不见",
                "singer": "王靖雯",
                "url": "",
                "duration": 279,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000001Q7hTQ3oNMJl.jpg?max_age=2592000",
                "album": "再不见"
            },
            {
                "id": 571067280,
                "mid": "002gBsot2LeB8J",
                "name": "专属天使",
                "singer": "王靖雯",
                "url": "",
                "duration": 238,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M00000003Wch3wetWH.jpg?max_age=2592000",
                "album": "忘记我"
            },
            {
                "id": 273978369,
                "mid": "001BoDJK4aKr7M",
                "name": "错的人",
                "singer": "王靖雯",
                "url": "",
                "duration": 16,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003UZGl92kO6EV.jpg?max_age=2592000",
                "album": "王靖雯的电台"
            },
            {
                "id": 295598978,
                "mid": "001zTIsO3XFkmK",
                "name": "起风了",
                "singer": "王靖雯",
                "url": "",
                "duration": 12,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003UZGl92kO6EV.jpg?max_age=2592000",
                "album": "王靖雯的电台"
            },
            {
                "id": 570718065,
                "mid": "002VDYj31JxCod",
                "name": "如果没有你",
                "singer": "李佳薇/王靖雯/赵磊",
                "url": "",
                "duration": 272,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000004EyK2N3cwY3I.jpg?max_age=2592000",
                "album": "百分百歌手·对战季 第5期"
            },
            {
                "id": 295599430,
                "mid": "000RKwd54YZoYW",
                "name": "最佳歌手",
                "singer": "王靖雯",
                "url": "",
                "duration": 17,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003UZGl92kO6EV.jpg?max_age=2592000",
                "album": "王靖雯的电台"
            },
            {
                "id": 291219707,
                "mid": "001L6ZT802vGv3",
                "name": "最后一页",
                "singer": "王靖雯",
                "url": "",
                "duration": 14,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000003UZGl92kO6EV.jpg?max_age=2592000",
                "album": "王靖雯的电台"
            },
            {
                "id": 340776255,
                "mid": "001aIPaN4WcWUN",
                "name": "忽而今夏",
                "singer": "汪苏泷/王靖雯",
                "url": "",
                "duration": 93,
                "pic": "https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000",
                "album": ""
            },
            {
                "id": 598365255,
                "mid": "003zGsdE10HqNe",
                "name": "傻笑",
                "singer": "王靖雯",
                "url": "",
                "duration": 235,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000002cEnwJ3y06xB.jpg?max_age=2592000",
                "album": "傻笑"
            },
            {
                "id": 556391590,
                "mid": "003PDJho4P38ol",
                "name": "狐御传说",
                "singer": "王靖雯/炫舞音乐 M·Vantasy",
                "url": "",
                "duration": 198,
                "pic": "https://y.gtimg.cn/music/photo_new/T002R800x800M000004JAD8j3ATi38.jpg?max_age=2592000",
                "album": "狐御传说"
            },
            {
                "id": 127557812,
                "mid": "000B27jQ3cADgz",
                "name": "纪念",
                "singer": "王靖雯",
                "url": "",
                "duration": 16,
                "pic": "https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000",
                "album": ""
            }
        ]
        }
        
        // songs.value
        if(result && result.singer){
          singer.value = result.singer
        }
        
        hasMore.value = result?.hasMore??false
        await nextTick()
        await makeItScrollable()
      }

      async function searchMore() {
        if (!hasMore.value || !props.query) {
          return
        }
        page.value++
        const result = await search(props.query, page.value, props.showSinger)
        songs.value = songs.value.concat(await processSongs(result.songs))
        hasMore.value = result.hasMore
        await nextTick()
        await makeItScrollable()
      }

      async function makeItScrollable() {
        if (scroll.value.maxScrollY >= -1) {
          manualLoading.value = true
          await searchMore()
          manualLoading.value = false
        }
      }

      function selectSong(song) {
        emit('select-song', song)
      }

      function selectSinger(singer) {
        emit('select-singer', singer)
      }

      return {
        singer,
        songs,
        loadingText,
        noResultText,
        loading,
        noResult,
        pullUpLoading,
        selectSong,
        selectSinger,
        // pullUpLoad
        rootRef
      }
    }
  }
</script>

<style lang="scss" scoped>
  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
        }
      }
    }
  }
</style>
