<script setup>
import MHeader from './components/header/mHeader.vue'
import mTab from './components/tab/mTab.vue'
import player from './components/player/player.vue';
</script>
<template>
  <m-header></m-header>
  <mTab></mTab>
  <router-view></router-view>
  <player></player>
</template>
