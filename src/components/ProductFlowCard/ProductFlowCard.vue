<template>
  <view>
    <image
      class="w-full shrink-0 rounded-lg"
      mode="aspectFill"
      lazy-load
      :lazy-load-margin="0"
      :src="hotSelling.link"></image>
    <view class="px-2 text-start">
      <view>
        <text
          v-if="hotSelling.isSelf"
          class="text-xs bg-red-500 text-white mr-1 pl-1 text-center">
          自营
        </text>
        <text class="text-md font-bold">{{ hotSelling.name }}</text>
      </view>
      <view class="text-md text-red-600 font-bold">
        ￥{{ hotSelling.price }}
      </view>
      <view class="text-xs text-gray-500">
        已售 {{ hotSelling.sold }} {{ hotSelling.quantifier }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { HotSelling } from '@/pages/index/entity/types'

export default {
  props: {
    hotSelling: {
      type: Object as () => HotSelling,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
