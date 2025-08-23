import { ref, watch, computed, nextTick } from 'vue'
export default function useFixed (groupRef, props) {
  const TITLE_HEIGHT = 30// 固定标题的高度
  const listHights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)// 当前展示区域的底部距离可见页面顶部的距离
  // 根据currentIndex获取当前区域title
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) return ''
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })
  // 设置样式
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`
    }
  })
  // 监听数据，计算高度
  watch(() => props.data, async () => {
    await nextTick()// 数据变化等待dom渲染完成后计算高度
    calculate()
  })
  // 监听滚动高度，获取currentIndex ,distance
  watch(scrollY, (newY) => {
    const listHightVal = listHights.value
    // 计算当前在那个展示区域是第几个（currentIndex）
    for (let i = 0; i < listHightVal.length - 1; i++) {
      const heightTop = listHightVal[i]
      const heightBottom = listHightVal[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })
  // 计算高度
  function calculate () {
    const list = groupRef.value.children
    const listHightVal = listHights.value
    let height = 0

    listHightVal.length = 0
    listHights.value.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHightVal.push(height)
    }
  }
  // 监听scroll 组件获取滚动高度
  function onScroll (pos) {
    scrollY.value = -pos.y
  }

  return {
    fixedTitle,
    onScroll,
    fixedStyle,
    currentIndex
  }
}
