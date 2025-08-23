<script setup>
import useScroll from './useScroll'
import { ref, defineProps, defineExpose, defineEmits } from 'vue'
const props = defineProps({
  click: {
    type: Boolean,
    default: true
  },
  probeType: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['scroll'])
const rootRef = ref(null)

const scroll = useScroll(rootRef, props, emit)
defineExpose({
  rootRef,
  scroll
})
</script>
<template>
    <div ref="rootRef">
        <slot></slot>
    </div>
</template>
