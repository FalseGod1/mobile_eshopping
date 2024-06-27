<template>
  <div>
    <van-row gutter="1">
      <van-col span="6" class="menu-left">
        <van-sidebar v-model="active" @change="onChange">
          <van-sidebar-item
            v-for="(item, index) in categoryList"
            :title="item.name"
            :key="index"
          />
        </van-sidebar>
      </van-col>
      <van-col span="18" class="menu-right">
        <div ref="rightCategoryDom">
          <div
            v-for="(item, index) in categoryList"
            :key="index"
            class="menu-right-item"
          >
            <div style="font-weight: 600; font-size: 14px">
              {{ item.name }}
            </div>
            <van-grid column-num="3">
              <van-grid-item
                v-for="(item2, index2) in item.sub"
                :key="index2"
              >
                <router-link
                  :to="{ name: 'goodslist', params: { category_id: item2.id } }"
                >
                  <img
                    :src="item2.image"
                    alt=""
                    style="width: 70px; height: 70px"
                  />
                  <span style="font-size: 14px; color: #333">{{ item2.name }}</span>
                </router-link>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script setup>
import { category } from '@/api/index'
import BScroll from 'better-scroll'
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

let active = ref(0)
const categoryList = ref([])
let rightCategoryDom = ref(null)
let scrollY = ref(0)
let rightBscroll = null
let topArr = ref([0])

onMounted(async () => {
  const res = await category()
  if (res && res.data) {
    categoryList.value = res.data
  } else {
    console.error('Failed to load category data')
    return
  }

  let top = 0
  await nextTick()

  // 增加⼀个底部的div，⾼度为100vh-最后⼀个⼆级分类的⾼度，这样既可以保证每个⼀级分类都可以正常滚动⼆级分类，有可以保证⼆级分类不会出现空⽩⻚出现
  const div = document.createElement('div')
  const length = rightCategoryDom.value.children.length
  if (length > 0) {
    const height = rightCategoryDom.value.children[length - 1].clientHeight
    div.style.height = `calc(100vh - ${height}px)`
    rightCategoryDom.value.appendChild(div)

    Array.from(rightCategoryDom.value.children).forEach((item) => {
      top += item.clientHeight
      topArr.value.push(top)
    })

    // 在onMounted中初始化BetterScroll
    rightBscroll = new BScroll('.menu-right', {
      mouseWheel: true,
      click: true,
      probeType: 3
    })

    rightBscroll.on('scroll', (pos) => {
      scrollY.value = Math.abs(pos.y)
      const index = topArr.value.findIndex((top, i) => {
        if (scrollY.value >= top && scrollY.value < topArr.value[i + 1]) {
          return true
        }
      })
      active.value = index
    })
  }
})

onUnmounted(() => {
  if (rightBscroll) {
    rightBscroll.destroy()
  }
})

watch(active, () => {
  if (rightBscroll) {
    rightBscroll.refresh()
  }
})

const onChange = () => {
  scrollY.value = topArr.value[active.value]
  rightBscroll.scrollTo(0, -topArr.value[active.value])
}
</script>

<style lang="scss" scoped>
.menu-left {
  position: fixed;
  overflow-y: auto;
}
.menu-right {
  margin-left: 25%;
  overflow-y: scroll;
  height: calc(100vh - 96px);
}
</style>