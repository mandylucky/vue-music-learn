<script setup>
import { computed } from "vue"
import { useStore } from "vuex";
import MHeader from './components/header/mHeader.vue'
import mTab from './components/tab/mTab.vue'
import player from './components/player/player.vue';
const store=useStore();
const playlist=computed(()=>store.state.playlist)
console.log(playlist,'===playlist')
const viewStyle=computed(()=>{
  const bottom=playlist.value.length?'60px':'0';
  return {
    bottom
  }
})
</script>
<template>
  <m-header></m-header>
  <mTab></mTab>
  <!-- 其他视图 -->
  <router-view :style="viewStyle" v-slot="{Component}">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <!-- 用户中心视图 -->
  <router-view 
    name="user" 
    :style="viewStyle" 
    v-slot="{ Component }">
      <transition  appear name="slide">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </transition>
  </router-view>
  <player></player>
</template>

