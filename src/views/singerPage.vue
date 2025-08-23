<script setup>
import indexList from '@/components/base/index-list/index-list.vue';
import { getSingerList } from '@/service/singer';
import {ref} from 'vue';
const singers=ref([])
getSingerList().then(res=>{
    singers.value=res.singers;
})
</script>
<template>
    <div class="singer" v-loading="!singers.length">
        <index-list :data="singers">
        </index-list>
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
