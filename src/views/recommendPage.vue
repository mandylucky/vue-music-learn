<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import Slider from '@/components/base/slider/slider.vue'
import scroll from '@/components/wrap-scroll'
import { getRecommend } from '@/service/recommend'
import { ALBUM_KEY } from '@/assets/js/constant'
const router=useRouter();

const sliders = ref([])
const albums = ref([])
const loading = ref(true)
const loadingText = ref('加载开始啦...')
const selectedAlbum=ref(null);

getRecommend().then(result => {
  sliders.value = result.sliders
  albums.value = result.albums
}).finally(() => {
  loading.value = false
})

function selectItem(album){
  this.selectedAlbum=album
  cacheAlbum(album)
  router.push({
    path:`/recommend/${album.id}`
  })
}
function cacheAlbum(album){
  storage.session.set(ALBUM_KEY,album)
}



</script>
<template>
    <div class="recommend" v-loading:[loadingText]="loading">
      <scroll class="recommend-content">
        <div>
          <div class="slider-wrapper">
            <div class="slider-content">
                <Slider v-if="sliders.length" :sliders="sliders"></Slider>
            </div>
          </div>
          <div class="recommend-list">
            <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
            <ul>
              <li
              v-for="item in albums"
              :key="item.id"
              class="item"
              @click="selectItem(item)"
              >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic"/>
              </div>
              <div class="text">
                <h2 class="name">{{ item.username }}</h2>
                <p class="title">{{ item.title }}</p>
              </div>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
      <router-view v-slot="{Component}">
        <transition appear name="slide">
          <component :is="Component" :data="selectedAlbum"></component>
        </transition>
      </router-view>
    </div>
</template>
<style lang="scss" scoped>
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: scroll;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 40%;
        overflow: hidden;
        .slider-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;

          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
          }
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .title {
            color: $color-text-d;
          }
        }
      }
    }
  }
</style>
