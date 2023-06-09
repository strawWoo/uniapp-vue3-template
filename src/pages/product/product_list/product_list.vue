<template>
  <fixed-bar>
    <template #title>
      <view class="flex flex-row w-full h-full items-center mx-3">
        <view class="basis-8" @click="toBack">
          <text class="text-lg iconfont icon-xiangzuo"></text>
        </view>
        <view class="text-lg">商品列表</view>
      </view>
    </template>
    <template #content>
      <view class="bg-red-600 pt-2 pb-10">
        <!-- 搜索框 -->
        <view class="mx-3 mb-3">
          <view class="relative">
            <view
              class="absolute top-0 pl-3 flex flex-row items-center justify-center h-full">
              <icon type="search" size="20" />
            </view>
            <input
              placeholder="点击搜索商品"
              placeholder-style="color: #bbbbbb; font-size:14px"
              type="text"
              class="rounded-full pl-10 h-7 bg-white" />
          </view>
        </view>
        <!-- tab标签 -->
        <view class="flex flex-row w-full justify-around">
          <view
            @click="selectProduct"
            class="text-white"
            :class="productOrStore ? 'underline underline-offset-8' : ''">
            商品
          </view>
          <view
            @click="selectShop"
            class="text-white"
            :class="productOrStore ? '' : 'underline underline-offset-8'">
            店铺
          </view>
        </view>
      </view>
      <!-- filter -->
      <view
        v-if="productOrStore"
        class="flex flex-row justify-around rounded-lg bg-white py-3 -mt-7">
        <view>默认</view>
        <view @click="priceStatusChange">
          价格
          <image
            v-if="priceStatus === 0"
            class="h-2 w-2"
            src="@/static/icon/horn.png"></image>
          <image
            v-if="priceStatus === 1"
            class="h-2 w-2"
            src="@/static/icon/down_red.png"></image>
          <image
            v-if="priceStatus === 2"
            class="h-2 w-2"
            src="@/static/icon/up_red.png"></image>
        </view>
        <view @click="sellStatusChange">
          销量
          <image
            v-if="sellStatus === 0"
            class="h-2 w-2"
            src="@/static/icon/horn.png"></image>
          <image
            v-if="sellStatus === 1"
            class="h-2 w-2"
            src="@/static/icon/down_red.png"></image>
          <image
            v-if="sellStatus === 2"
            class="h-2 w-2"
            src="@/static/icon/up_red.png"></image>
        </view>
      </view>
      <!-- 热推店铺 -->
      <view class="-mt-7" v-if="!productOrStore">
        <ShopCard :shop-info="shopInfos[0]"></ShopCard>
      </view>
      <view class="bg-gray-100 h-3 w-full"></view>
    </template>
  </fixed-bar>
  <view v-if="productOrStore" class="mt-56">
    <view
      class="flex flex-col mt-10 mx-3 mb-3 text-center space-y-3 items-center">
      <view class="grid grid-cols-2 gap-2 w-full">
        <view class="flex flex-col gap-y-1">
          <!-- 商品 -->
          <block v-for="(hotSelling, index) in hotSellingList" :key="index">
            <view v-if="index % 2 == 0">
              <ProductFlowCard :hot-selling="hotSelling"></ProductFlowCard>
            </view>
          </block>
        </view>
        <view class="flex flex-col gap-y-1">
          <block v-for="(hotSelling, index) in hotSellingList" :key="index">
            <view v-if="index % 2 == 1">
              <ProductFlowCard :hot-selling="hotSelling"></ProductFlowCard>
            </view>
          </block>
        </view>
      </view>
      <view class="pb-10 text-gray-300 text-center">已经到底啦！</view>
    </view>
  </view>

  <view v-if="!productOrStore" class="flex flex-col space-y-3 mt-[720rpx]">
    <view v-for="shopInfo in shopInfos.filter((_, index) => index > 0)">
      <ShopCard :shop-info="shopInfo" :show-product-list="false"></ShopCard>
    </view>
    <view class="pb-10 text-gray-300 text-center">已经到底啦！</view>
  </view>
</template>

<script lang="ts" setup>
import FixedBar from '@/components/FixedBar/FixedBar.vue'
import { HotSelling } from '@/pages/index/entity/types'
import ProductFlowCard from '@/components/ProductFlowCard/ProductFlowCard.vue'
import { ShopInfo } from '../entity/types'
import ShopCard from '@/pages/product/components/ShopCard/ShopCard.vue'

const priceStatus = ref(0)
const sellStatus = ref(0)
const productOrStore = ref(true)

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

const shopInfos: Ref<ShopInfo[]> = ref([
  {
    id: 1,
    name: '小雨数码科技',
    logoUrl:
      'https://img2.baidu.com/it/u=736165808,3433140397&fm=253&fmt=auto&app=120&f=JPG?w=500&h=500',
    isSelf: true,
    follows: 114,
    evaluateScore: 3,
    productLists: [
      {
        coverImageUrl:
          'https://img2.baidu.com/it/u=2555939542,3076959347&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        price: 148
      },
      {
        coverImageUrl:
          'https://img2.baidu.com/it/u=1825692511,69642313&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=480',
        price: 19.99
      },
      {
        coverImageUrl:
          'https://img2.baidu.com/it/u=583177817,68195099&fm=253&fmt=auto&app=120&f=PNG?w=565&h=500',
        price: 11400.5
      }
    ]
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  },
  {
    id: 2,
    name: '花花公子旗舰店',
    logoUrl:
      'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde71190efc11d1ea3d91b9d16fcfacb81',
    isSelf: true,
    follows: 100234,
    evaluateScore: 4,
    productLists: []
  }
])

function selectProduct() {
  productOrStore.value = true
}

function selectShop() {
  productOrStore.value = false
}

function priceStatusChange() {
  switch (priceStatus.value) {
    case 0:
      priceStatus.value = 1
      break
    case 1:
      priceStatus.value = 2
      break
    case 2:
      priceStatus.value = 0
      break
  }
}

function sellStatusChange() {
  switch (sellStatus.value) {
    case 0:
      sellStatus.value = 1
      break
    case 1:
      sellStatus.value = 2
      break
    case 2:
      sellStatus.value = 0
      break
  }
}

function toBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped></style>
