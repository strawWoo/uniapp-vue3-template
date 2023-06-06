<template>
  <view
    class="fixed top-0 w-full z-20 bg-red-400 bg-opacity-0"
    :style="{ 'padding-top': mTop + 'px' }">
    <view
      class="flex flex-row space-x-2"
      :style="{ width: searchWidth + 'px' }">
      <view
        class="basis-1/3 bg-yellow-200"
        :style="{ height: searchHight + 'px' }"></view>
      <view class="basis-2/3 bg-sky-400"></view>
    </view>
    <view class="flex flex-row mx-4 mt-4 h-9">
      <view class="w-11/12">
        <scroll-view
          enable-flex="true"
          class="flex flex-row flex-nowrap h-9"
          scroll-x="true"
          scroll-with-animation="true"
          :scroll-left="typesScrollLeft">
          <text
            v-for="(barType, index) in barTypes"
            :key="index"
            @click="selectBar(index)"
            class="text-white shrink-0 mr-5 h-9"
            :class="
              isActiveBar(index)
                ? 'text-md underline underline-offset-8 decoration-2'
                : 'text-sm'
            ">
            {{ barType }}
          </text>
        </scroll-view>
      </view>
      <viwe class="text-md w-1/12 text-right text-white shrink-0">
        <text @click="showAllType">{{ isShowAllTypes ? '↑' : '↓' }}</text>
      </viwe>
    </view>
  </view>

  <view class="w-full bg-purple-400" :style="{ height: mBottom + 'px' }"></view>
  <view
    class="absolute w-full h-screen text-center z-10"
    :style="{ top: mBottom + 'px' }"
    v-if="isShowAllTypes">
    <view class="w-full flex felx-row flex-wrap bg-white px-2 py-3">
      <view class="mr-2 mb-1">
        <text class="text-xs">全部分类</text>
      </view>
      <view v-for="(varType, index) in barTypes" :key="index" class="mr-1 mb-3">
        <view
          class="rounded-full h-6 px-3 text-xs pt-1 shrink-0"
          :class="
            isActiveBar(index)
              ? 'bg-red-100 border border-red-500 text-red-600'
              : 'bg-gray-200'
          ">
          <text @click="selectBar(index)">
            {{ varType }}
          </text>
        </view>
      </view>
    </view>
    <view class="bg-gray-900 opacity-30 h-screen" @click="showAllType"></view>
  </view>
  <view class="w-full h-screen bg-green-300" v-if="isIndex"></view>
  <view class="w-full h-screen bg-gray-200" v-if="!isIndex"></view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const windowWidth = uni.getSystemInfoSync().windowWidth
const mButton = uni.getMenuButtonBoundingClientRect()
const mTop = ref(mButton.top)
const searchHight = ref(mButton.height)
const searchWidth = ref(windowWidth - mButton.width - 15)
const mBottom = ref(mTop.value + searchHight.value + remToPx(1) + remToPx(2.25))

const activeIndex = ref(0)
const isIndex = ref(true)
const isShowAllTypes = ref(false)
const typesScrollLeft = ref(0)

let barTypes = ref([
  '首页',
  '音乐',
  '手机',
  '饰品',
  '电器',
  '运动',
  '数码',
  '车品',
  '美妆',
  '纸制类',
  '阀门',
  '花艺',
  '运动鞋服'
])

function selectBar(index: number) {
  activeIndex.value = index
  isIndex.value = index === 0
  isShowAllTypes.value = false
  typesScrollLeft.value = remToPx(2.5) * index
}

function isActiveBar(index: number) {
  return activeIndex.value === index
}

function showAllType() {
  isShowAllTypes.value = !isShowAllTypes.value
}

// 从rem转为px
function remToPx(rem: number) {
  return rem * 18
}
</script>

<style lang="scss" scoped></style>
