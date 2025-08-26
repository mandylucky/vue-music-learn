<script setup>
import indexList from '@/components/index-list/index-list.vue'
import { getSingerList } from '@/service/singer'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import {SINGER_KEY} from "@/assets/js/constant.js"
const singers = ref([])
const selectedSinger=ref(null)
const router=useRouter();
getSingerList().then(res => {
  singers.value = res.singers
})

function selectSinger(singer){
  selectedSinger.value=singer;
  cacheSinger(singer);
  setTimeout(()=>{
    router.push({
      path:`/singer/${singer.mid}`
    })
  })
}

function cacheSinger(singer){
  storage.session.set(SINGER_KEY,singer)
}
</script>
<template>
    <div class="singer" v-loading="!singers.length">
        <index-list :data="singers" 
        @select="selectSinger"
        >
        </index-list>
        <router-view v-slot="{Component}">
          <transition appear name="slide">
            <component :is="Component" :singer="selectedSinger"></component>
          </transition>
        </router-view>

    </div>
</template>
<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
