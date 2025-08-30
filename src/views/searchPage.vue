<template>
    <div class="search">
        <div class="search-input-wrapper">
            <search-input v-model="query"></search-input>
        </div>
        <Scroll ref="scrollRef" class="search-content" v-show="!query">
          <div class="hot-keys">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li 
              class="item"
              v-for="item in hotKeys"
              :key="item.id"
              @click="addQuery(item.key)"
              >
                <span>{{ item.key }}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <confirm
              ref="confirmRef"
              text="是否清空所有搜索历史"
              confirm-btn-text="清空"
            
            >
            </confirm>
            <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
            >
            </search-list>
          </div>
        </Scroll>
        <div class="search-result" v-show="query">
          <suggest 
          :query="query"
          @select-song="selectSong"
          @select-singer="selectSinger"
            ></suggest>
        </div>
    </div>
</template>
<script>
import suggest from '@/components/search/suggest.vue';
import searchInput from '@/components/search/search-input.vue';
import searchList from '@/components/base/search-list/search-list.vue';
import useSearchHistory from "@/components/search/use-search-history";
import Scroll from '@/components/wrap-scroll'
import Confirm from '@/components/base/confirm/confirm'
import {ref,computed,watch, nextTick} from "vue"
import { getHotKeys } from "@/service/search";
import { useStore } from 'vuex';

export default {
    name:'search',
    components:{
        searchInput,
        suggest,
        searchList,
        Confirm,
        Scroll,
    },
    setup(){
        const query=ref("");
        const confirmRef = ref(null)
        const scrollRef=ref(null);
        const hotKeys=ref([])

        const store=useStore()
        const {saveSearch,deleteSearch}=useSearchHistory()
        const searchHistory=computed(()=>store.state.searchHistory)
        getHotKeys().then((reslut)=>{
          hotKeys.value=reslut?.hotKeys ??
          [{
            id:1,
            key:'我们的歌'
          },{
            id:2,
            key:'冰雪奇缘2'
          },{
            id:3,
            key:'张杰'
          },{
            id:4,
            key:'五月天'
          }
]
        })

        watch(query,async (newQuery)=>{
          if(!newQuery){
            await nextTick()
            refreshScroll()
          }
        })

        function refreshScroll(){
          scrollRef.value.scroll.refresh()
        }

        function addQuery(s){
          query.value=s;
        }

        function selectSong(song){
          saveSearch(query.value)
          store.dispatch('addSong',song)
        }

        function selectSinger(singer) {
          saveSearch(query.value)
          selectedSinger.value = singer
          cacheSinger(singer)

          router.push({
            path: `/search/${singer.mid}`
          })
        }

        function showConfirm() {
          confirmRef.value.show()
        }
        return {
            query,
            hotKeys,
            searchHistory,
            confirmRef,
            addQuery,
            selectSong,
            selectSinger,
            showConfirm,
            deleteSearch,
        }
    }
    
}
</script>
<style lang="scss" scoped>
  .search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .search-input-wrapper {
      margin: 20px;
    }
    .search-content {
      flex: 1;
      overflow: hidden;
      .hot-keys {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
    .search-result {
      flex: 1;
      overflow: hidden;
    }
  }
</style>


