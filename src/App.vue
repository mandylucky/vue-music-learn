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
  <router-view :style="viewStyle"></router-view>
  <player></player>
</template>

