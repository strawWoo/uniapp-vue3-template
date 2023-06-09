<template>
  <!-- 导航栏 -->
  <view class="fixed top-0 w-full z-20">
    <view
      class="bg-white transition duration-200"
      :style="{ 'padding-top': mTop + 'px' }"
      :class="searchStyleChange ? 'bg-opacity-100' : 'bg-opacity-0'">
      <!-- logo && 搜索 -->
      <view
        class="flex flex-row space-x-2"
        :style="{ width: searchWidth + 'px', height: searchHight + 'px' }">
        <view class="basis-1/3 bg-yellow-200"></view>
        <view class="relative basis-2/3">
          <view
            class="absolute top-0 pl-3 flex flex-row items-center justify-center h-full">
            <icon type="search" size="20" />
          </view>
          <input
            disabled
            placeholder="搜索商品"
            placeholder-style="color: #bbbbbb; font-size:14px"
            type="text"
            @click="toSearchPage"
            class="rounded-full pl-10 h-full text-gray-100"
            :class="searchStyleChange ? ' bg-gray-100' : 'bg-white'" />
        </view>
      </view>

      <!-- 导航标签 -->
      <view class="flex flex-row mx-4 mt-4">
        <!-- 横向标签 -->
        <view class="w-11/12">
          <scroll-view
            class="whitespace-nowrap h-9 no-scrollbar"
            scroll-x="true"
            scroll-with-animation="false"
            :scroll-left="typesScrollLeft">
            <text
              v-for="(barType, index) in barTypes"
              :key="index"
              @click="selectBar(index)"
              class="shrink-0 mr-5 h-9 inline-block"
              :class="[
                isActiveBar(index)
                  ? 'text-md font-bold underline underline-offset-8 decoration-2'
                  : 'text-xs',
                searchStyleChange ? ' text-black' : 'text-white'
              ]">
              {{ barType }}
            </text>
          </scroll-view>
        </view>
        <!-- 全部分类 -->
        <viwe
          class="w-1/12"
          :class="[searchStyleChange ? ' text-black' : 'text-white']">
          <view class="text-right pt-[5rpx]" @click="showAllType">
            <text
              class="text-xs iconfont"
              :class="
                isShowAllTypes ? 'icon-xiangshang' : 'icon-xiangxia'
              "></text>
          </view>
        </viwe>
      </view>
    </view>
    <!-- 全部分类详细 -->
    <view
      class="w-full flex felx-row flex-wrap bg-white px-2 py-3"
      v-if="isShowAllTypes">
      <view class="mr-2 mb-1">
        <text class="text-xs">全部分类</text>
      </view>
      <view v-for="(varType, index) in barTypes" :key="index" class="mr-1 mb-3">
        <view
          class="rounded-lg h-6 px-3 text-xs pt-1 shrink-0"
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
    <view
      class="bg-gray-900 opacity-30 h-screen"
      @click="showAllType"
      v-if="isShowAllTypes"></view>
  </view>

  <!-- 首页 -->
  <view class="relative flex flex-col w-full">
    <!-- 导航背景 -->
    <view class="absolute top-0 w-full" :style="{ height: barBottom + 'px' }">
      <image
        class="w-full h-full blur-lg"
        mode="scaleToFill"
        lazy-load
        :src="barBackgroundImage" />
    </view>
    <view class="absolute w-full" :style="{ top: mBottom + 'px' }">
      <!-- 轮播图 -->
      <view class="flex flex-row">
        <view class="uni-margin-wrap w-full">
          <swiper
            class="swiper"
            circular
            :autoplay="isBarAutoplay"
            indicator-dots="true"
            indicator-color="	rgba(255, 255, 255, 0.2)"
            indicator-active-color="rgba(255, 255, 255, 0.8)"
            interval="3000"
            @change="swiperChange"
            previous-margin="30rpx"
            next-margin="30rpx">
            <swiper-item
              v-for="(barImage, index) in barImages"
              :key="index"
              class="flex flex-row justify-center items-center rounded-xl">
              <image
                class="w-full px-1"
                mode="aspectFit"
                lazy-load
                :src="barImage" />
            </swiper-item>
          </swiper>
        </view>
      </view>
      <!-- 首页咨询 -->
      <view v-if="isIndex">
        <!-- 新闻头条 -->
        <view
          class="mx-3 mt-5 h-9 bg-white rounded-lg flex flex-row space-x-1 items-center">
          <view class="basis-11/12 rounded-lg flex flex-row pl-4">
            <view class="mr-2">新闻头条</view>
            <view class="mr-2">|</view>
            <view class="text-xs text-gray-500 flex flex-row items-center">
              如何打造一款爆款？
            </view>
          </view>
          <view class="basis-1/12 text-gray-300 pr-3 text-right">
            <text class="text-lg">></text>
          </view>
        </view>
        <!-- 金刚区 -->
        <view
          class="mx-3 mt-3 px-4 h-20 bg-white rounded-lg flex flex-row space-x-4 justify-center items-center">
          <view class="flex flex-col my-4 basis-1/5 items-center">
            <image
              class="w-12 h-12 rounded-full"
              lazy-load
              src="https://pic.616pic.com/ys_bnew_img/00/04/36/0ustb6Rf8X.jpg"></image>
            <view class="text-xs text-gray-600">购物车</view>
          </view>
          <view class="flex flex-col my-4 basis-1/5 items-center">
            <image
              class="w-12 h-12 rounded-full"
              lazy-load
              src="https://pic.616pic.com/ys_bnew_img/00/04/36/0ustb6Rf8X.jpg"></image>
            <view class="text-xs text-gray-600">商户入驻</view>
          </view>
          <view class="flex flex-col my-4 basis-1/5 items-center">
            <image
              class="w-12 h-12 rounded-full"
              lazy-load
              src="https://pic.616pic.com/ys_bnew_img/00/04/36/0ustb6Rf8X.jpg"></image>
            <view class="text-xs text-gray-600">我的收藏</view>
          </view>
          <view class="flex flex-col my-4 basis-1/5 items-center">
            <image
              class="w-12 h-12 rounded-full"
              lazy-load
              src="https://pic.616pic.com/ys_bnew_img/00/04/36/0ustb6Rf8X.jpg"></image>
            <view class="text-xs text-gray-600">我的分类</view>
          </view>
          <view class="flex flex-col my-4 basis-1/5 items-center">
            <image
              class="w-12 h-12 rounded-full"
              lazy-load
              src="https://pic.616pic.com/ys_bnew_img/00/04/36/0ustb6Rf8X.jpg"></image>
            <view class="text-xs text-gray-600">签到</view>
          </view>
        </view>
        <!-- 直播 -->
        <view
          class="mx-3 mt-3 px-3 pt-3 h-52 bg-white rounded-lg flex flex-col">
          <!-- 标题 -->
          <view class="flex flex-row justify-between">
            <view class="flex flex-col">
              <view>
                <text class="text-[30rpx] mr-2">精彩直播</text>
                <text class="text-[20rpx] text-gray-500">新品抢先购</text>
              </view>
              <view class="text-[20rpx] text-gray-400">First new product</view>
            </view>
            <view class="text-xs pt-1 text-gray-400">MORE ></view>
          </view>
          <view class="flex flex-row mt-4 justify-start space-x-6">
            <view>
              <image
                mode="widthFix"
                class="w-32 h-32 rounded-lg"
                lazy-load
                src="http://p4.itc.cn/images01/20210103/5429b9e9aff143cf91139df1a282d1f5.jpeg"></image>
            </view>
            <view>
              <image
                model="widthFix"
                class="w-32 h-32 rounded-lg"
                lazy-load
                src="http://p4.itc.cn/images01/20210103/5429b9e9aff143cf91139df1a282d1f5.jpeg"></image>
            </view>
          </view>
        </view>
        <!-- 限时秒杀 -->
        <view
          class="relative mx-3 mt-3 px-3 pt-3 h-52 bg-white rounded-lg flex flex-col bg-gradient-to-b from-red-400 to-white">
          <!-- 标题 -->
          <view class="flex flex-row justify-between">
            <view class="flex flex-row items-center">
              <text class="text-[30rpx] mr-1 text-white font-bolds">
                限时秒杀
              </text>
              <text class="text-[25rpx] mr-2 text-white">|</text>
              <text class="text-[20rpx] text-gray-200">邀请你的好友来参与</text>
            </view>
            <view class="text-xs pt-1 text-gray-400 text-center">
              <view
                class="border border-yellow-600 rounded-full bg-yellow-100 bg-opacity-70 text-yellow-600 py-[3px] px-2">
                <text class="pl-1">GO></text>
              </view>
            </view>
          </view>
          <!-- 商品 -->
          <view class="flex flex-row mt-4 justify-start">
            <scroll-view
              class="whitespace-nowrap no-scrollbar"
              scroll-x="true"
              scroll-with-animation="false"
              :scroll-left="typesScrollLeft">
              <view
                v-for="(spike, index) in spikeList"
                :key="index"
                class="mr-2 h-9 inline-block">
                <image
                  model="widthFix"
                  class="shrink-0 w-24 h-24 rounded-xl"
                  lazy-load
                  src="https://img2.baidu.com/it/u=3839043581,995505399&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
                <text
                  class="text-xs w-24 text-gray-600 truncate overflow-hidden block">
                  {{ spike.name }}
                </text>
                <view class="text-xs text-red-500 font-semibold">
                  ￥{{ spike.price }}
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
        <!-- 品牌好店 -->
        <view class="flex flex-col mx-3 mt-3 pt-3">
          <!-- 标题 -->
          <view class="flex flex-row justify-between">
            <view class="flex flex-col">
              <view>
                <text class="text-[30rpx] mr-2">品牌好店</text>
                <text class="text-[20rpx] text-gray-500">正品大牌低价购</text>
              </view>
              <view class="text-[20rpx] text-gray-400">Good brand store</view>
            </view>
            <view class="text-xs pt-1 text-gray-400">MORE ></view>
          </view>
          <!-- 店铺展示 -->
          <view
            class="flex flex-row mt-4 gap-y-2 flex-wrap"
            :class="goodShopJustify">
            <view
              v-for="(goodShop, index) in goodShopList"
              :key="index"
              class="relative flex flex-col">
              <image
                mode="widthFix"
                class="rounded-lg shrink-0 w-28 h-28"
                lazy-load
                src="https://img1.baidu.com/it/u=2572882232,3146660073&fm=253&fmt=auto?w=573&h=500" />
              <view
                class="flex flex-col pt-5 items-center text-center space-y-2 rounded-lg bg-white h-16">
                <view class="text-xs font-bold">{{ goodShop }}</view>
                <view
                  class="rounded-full w-10 bg-red-500 text-white text-[10px]">
                  连锁店
                </view>
              </view>
              <view
                class="absolute rounded-lg bg-white w-20 h-6 self-center top-[180rpx] shadow-sm shadow-gray-300 text-center">
                xiaoyu
              </view>
            </view>
          </view>
        </view>
        <!-- 热门推荐 -->
        <view
          class="flex flex-col mt-3 mx-3 mb-3 text-center space-y-3 items-center">
          <view>---------- 热门推荐 ----------</view>
          <view class="grid grid-cols-2 gap-1 w-full">
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
        </view>
      </view>
    </view>
  </view>
  <!-- 分类 -->
  <view
    class="absolute w-full h-full bg-gray-100 z-10"
    :style="{ top: mBottom + 'px' }"
    v-if="!isIndex">
    <!-- 类型 -->
    <view
      class="rounded-lg bg-white h-40 mt-3 mx-3 grid grid-cols-5 grid-rows-2 gap-x-3 gap-y-1 px-1 py-3">
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://jmy-pic.baidu.com/0/pic/159601fc7f1e8e39dc7b9e31dc613f5f.jpg"></image>
        <view class="text-center text-xs text-gray-500 font-black">华为</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://img1.baidu.com/it/u=3942809987,1137302445&fm=253&fmt=auto&app=138&f=JPG?w=500&h=250"></image>
        <view class="text-center text-xs text-gray-500 font-black">OPPO</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://img1.baidu.com/it/u=2367536783,1277561976&fm=253&fmt=auto&app=120&f=JPEG?w=1128&h=800"></image>
        <view class="text-center text-xs text-gray-500 font-black">中兴</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://jmy-pic.baidu.com/0/pic/159601fc7f1e8e39dc7b9e31dc613f5f.jpg"></image>
        <view class="text-center text-xs text-gray-500 font-black">华为</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://jmy-pic.baidu.com/0/pic/159601fc7f1e8e39dc7b9e31dc613f5f.jpg"></image>
        <view class="text-center text-xs text-gray-500 font-black">华为</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://jmy-pic.baidu.com/0/pic/159601fc7f1e8e39dc7b9e31dc613f5f.jpg"></image>
        <view class="text-center text-xs text-gray-500 font-black">华为</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://jmy-pic.baidu.com/0/pic/159601fc7f1e8e39dc7b9e31dc613f5f.jpg"></image>
        <view class="text-center text-xs text-gray-500 font-black">华为</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://jmy-pic.baidu.com/0/pic/159601fc7f1e8e39dc7b9e31dc613f5f.jpg"></image>
        <view class="text-center text-xs text-gray-500 font-black">华为</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image
          mode="aspectFit"
          class="w-full h-full rounded-full"
          src="https://jmy-pic.baidu.com/0/pic/159601fc7f1e8e39dc7b9e31dc613f5f.jpg"></image>
        <view class="text-center text-xs text-gray-500 font-black">华为</view>
      </view>
      <view
        class="flex flex-col justify-center items-center w-full h-full space-y-1">
        <image mode="aspectFit" class="w-20 h-20 rounded-full" src=""></image>
        <view class="text-center text-xs text-gray-500 font-black">更多</view>
      </view>
    </view>
    <!-- 热门推荐 -->
    <view class="flex flex-col mt-3 mx-3 text-center space-y-3 items-center">
      <view class="grid grid-cols-2 gap-1 w-full">
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
    </view>
  </view>
</template>

<script setup lang="ts">
import { HotSelling } from './entity/types'
import ProductFlowCard from '@/components/ProductFlowCard/ProductFlowCard.vue'

const windowWidth = uni.getSystemInfoSync().windowWidth
const mButton = uni.getMenuButtonBoundingClientRect()
const mTop = ref(mButton.top)
const searchHight = ref(mButton.height)
const searchWidth = ref(windowWidth - mButton.width - 15)
const mBottom = ref(mTop.value + searchHight.value + remToPx(1) + remToPx(2.25))
const barBottom = mBottom.value + 150 + 10

const activeIndex = ref(0)
const isIndex = ref(true)
const isShowAllTypes = ref(false)
const typesScrollLeft = ref(0)
const searchStyleChange = ref(false)
const barBackgroundImage = ref(
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80'
)
const isBarAutoplay = ref(true)
const goodShopJustify = computed(() => {
  return goodShopList.value.length >= 3
    ? 'justify-around gap-x-1 '
    : 'justify-start gap-x-3 '
})

onPageScroll((e) => {
  if (e.scrollTop > 50 && searchStyleChange.value === false) {
    searchStyleChange.value = true
  } else if (e.scrollTop <= 50 && searchStyleChange.value === true) {
    searchStyleChange.value = false
  }
})

onReachBottom(() => {
  console.log('触底了')
})

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

let barImages = ref([
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80',
  'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80',
  'https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80'
])

let spikeList = ref([
  { name: '夏天的额短袖', price: '0.03' },
  { name: '现代轻奢创业风格', price: '0.01' },
  { name: '美式轻奢橘色鲜花篮', price: '1.88' },
  { name: '现代轻奢电子化锁', price: '6.23' },
  { name: '夏天的额短袖', price: '0.03' },
  { name: '现代轻奢创业风格', price: '0.01' },
  { name: '美式轻奢橘色鲜花篮', price: '1.88' },
  { name: '现代轻奢电子化锁', price: '6.23' }
])

let goodShopList = ref([
  '小雨数码科技',
  '小雨数码科技',
  '小雨数码科技',
  '小雨数码科技',
  '小雨数码科技',
  '小雨数码科技'
])

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

function selectBar(index: number) {
  activeIndex.value = index
  if (index === 0) {
    isIndex.value = true
    isBarAutoplay.value = true
  } else {
    isIndex.value = false
    isBarAutoplay.value = false
  }
  isShowAllTypes.value = false
  typesScrollLeft.value = remToPx(2.5) * index - 200
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 200
  })
}

function isActiveBar(index: number) {
  return activeIndex.value === index
}

function showAllType() {
  isShowAllTypes.value = !isShowAllTypes.value
}

function remToPx(rem: number) {
  return rem * 18
}

function swiperChange(e: any) {
  barBackgroundImage.value = barImages.value[e.detail.current]
}

function toSearchPage() {
  uni.navigateTo({
    url: '/pages/index/sub_pages/search/search'
  })
}
</script>

<style lang="scss" scoped></style>
