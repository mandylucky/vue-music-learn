<script setup>
import MHeader from './components/header/mHeader.vue'
import mTab from './components/tab/mTab.vue'
</script>
<template>
  <m-header></m-header>
  <mTab></mTab>
  <router-view></router-view>
</template>
