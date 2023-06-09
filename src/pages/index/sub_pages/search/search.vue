<template>
  <fixed-bar>
    <template #title>
      <view class="flex flex-row w-full h-full items-center mx-3">
        <view class="basis-8" @click="toBack">
          <text class="text-lg iconfont icon-xiangzuo"></text>
        </view>
        <view class="text-lg">搜索商品</view>
      </view>
    </template>
  </fixed-bar>

  <!-- 搜索框 -->
  <view class="mx-3 flex flex-row" :style="{ 'margin-top': searchTop + 'px' }">
    <view class="relative basis-10/12">
      <view
        class="absolute top-0 pl-3 flex flex-row items-center justify-center h-full">
        <icon type="search" size="20" />
      </view>
      <input
        placeholder="点击搜索商品"
        placeholder-style="color: #bbbbbb; font-size:14px"
        type="text"
        class="rounded-full pl-10 h-8 bg-gray-100" />
    </view>
    <view class="flex flex-row items-center justify-center basis-2/12">
      <view class="text-right text-md">搜索</view>
    </view>
  </view>
  <!-- 热门搜索 -->
  <view class="flex flex-col space-y-3 mx-3 mt-8">
    <view class="text-gray-500">热门搜索</view>
    <view class="flex flex-row space-x-2">
      <view class="py-1 px-2 border rounded-full">叶子</view>
      <view class="py-1 px-2 border rounded-full">鞋子</view>
      <view class="py-1 px-2 border rounded-full">衣服</view>
    </view>
  </view>
  <!-- 热门推荐 -->
  <view
    class="flex flex-col mt-10 mx-3 mb-3 text-center space-y-3 items-center">
    <view>---------- 热门推荐 ----------</view>
    <view class="grid grid-cols-2 gap-1 w-full">
      <view class="flex flex-col gap-y-1">
        <!-- 商品 -->
        <block v-for="(hotSelling, index) in hotSellingList" :key="index">
          <view v-if="index % 2 == 0">
            <HotSellingCard :hot-selling="hotSelling"></HotSellingCard>
          </view>
        </block>
      </view>
      <view class="flex flex-col gap-y-1">
        <block v-for="(hotSelling, index) in hotSellingList" :key="index">
          <view v-if="index % 2 == 1">
            <HotSellingCard :hot-selling="hotSelling"></HotSellingCard>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import FixedBar from '@/components/FixedBar/FixedBar.vue'
import { HotSelling } from '../../entity/types'
import HotSellingCard from '../../components/HotSellingCard/HotSellingCard.vue'

const mButton = uni.getMenuButtonBoundingClientRect()
const searchTop = ref(mButton.bottom + 12)

let hotSellingList: Ref<HotSelling[]> = ref([
  {
    link: 'https://img0.baidu.com/it/u=2207877285,3384906173&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    isSelf: true,
    name: 'KESSSOKU-KITA红色连衣裙',
    price: 40.8,
    sold: 21,
    quantifier: '件'
  },
  {
    link: 'https://img2.baidu.com/it/u=280701719,773204585&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    isSelf: false,
    name: '红色风衣-黑色墨镜-高跟',
    price: 116.5,
    sold: 162,
    quantifier: '件'
  },
  {
    link: 'https://img1.baidu.com/it/u=1500145425,1463171609&fm=253&fmt=auto&app=138&f=JPEG?w=543&h=500',
    isSelf: false,
    name: 'MK-YOUKONW-黑色袍子',
    price: 245.62,
    sold: 62,
    quantifier: '件'
  },
  {
    link: 'https://img1.baidu.com/it/u=1257167519,4214117822&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
    isSelf: true,
    name: '正版连衣裙女2021夏季新款收腰显瘦大码',
    price: 674.21,
    sold: 1134,
    quantifier: '件'
  },
  {
    link: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2016%2F034%2F453%2F3144354430_1100022487.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1688741433&t=cafefeedd689b1751ccdbbb7152c59e8',
    isSelf: true,
    name: '2016欧洲站女装时尚爆款代理加盟立领撞色短袖',
    price: 64.56,
    sold: 10094,
    quantifier: '件'
  }
])

function toBack() {
  uni.navigateBack()
}
</script>

<style>
page {
  background-color: rgb(255 255 255);
}
</style>

<style lang="scss" scoped></style>
