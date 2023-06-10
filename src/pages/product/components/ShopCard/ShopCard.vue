<template>
  <view class="flex flex-col rounded-lg space-y-3 bg-white p-3 mx-3">
    <!-- 店铺信息 -->
    <view class="flex flex-row justify-between">
      <view class="flex flex-row space-x-3">
        <view>
          <image
            mode="aspectFit"
            class="h-10 w-10 rounded-lg"
            :src="shopInfo.logoUrl"></image>
        </view>
        <view class="flex flex-col">
          <view>
            <text class="font-bold mr-2">{{ shopInfo.name }}</text>
            <text
              class="text-xs bg-red-600 text-white pl-1 pr-2 rounded-md"
              v-if="shopInfo.isSelf">
              自营
            </text>
          </view>
          <view>
            <text
              v-for="i in 5"
              :key="i"
              class="iconfont mr-1 icon-pingfen text-xs text-red-600"
              :class="
                shopInfo.evaluateScore > i ? 'text-red-600' : 'text-gray-600'
              "></text>
            <text class="text-gray-400 text-xs">
              {{ shopInfo.follows }}人关注
            </text>
          </view>
        </view>
      </view>
      <view>
        <view
          class="rounded-full px-4 py-1 text-white text-xs bg-gradient-to-r from-orange-300 to-red-500">
          进店
        </view>
      </view>
    </view>
    <!-- 店铺商品图片 -->
    <view v-if="showProductList" class="grid grid-cols-3 gap-2">
      <view
        v-for="product in shopInfo.productLists"
        :key="product.id"
        class="relative">
        <image
          class="h-[200rpx] w-[200rpx] rounded-lg"
          :src="product.coverImageUrl"></image>
        <view
          class="absolute bg-gray-950 bg-opacity-50 right-[12rpx] px-1 rounded-md bottom-[12rpx] text-white">
          <text class="text-[8px] text-gray-200">￥</text>
          <text class="text-xs text-gray-200">
            {{ TwoDecimalPlaces(product.price) }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { ShopInfo } from '../../entity/types'
import { TwoDecimalPlaces } from '@/utils/priceUtils'

export default {
  props: {
    shopInfo: {
      type: Object as () => ShopInfo,
      required: true
    },
    showProductList: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    TwoDecimalPlaces
  }
}
</script>

<style lang="scss" scoped></style>
