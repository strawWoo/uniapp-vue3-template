<template>
  <view class="fixed top-0 w-full z-20">
    <view class="bg-white" :style="{ 'padding-top': mTop + 'px' }">
      <view
        class="flex flex-row space-x-2"
        :style="{ width: searchWidth + 'px', height: searchHight + 'px' }">
        <slot name="title"></slot>
      </view>
    </view>
    <slot name="content"></slot>
  </view>
</template>

<script lang="ts" setup>
const windowWidth = uni.getSystemInfoSync().windowWidth
const mButton = uni.getMenuButtonBoundingClientRect()
const mTop = ref(mButton.top)
const searchHight = ref(mButton.height)
const searchWidth = ref(windowWidth - mButton.width - 15)
</script>

<style lang="scss" scoped></style>
