<template>
  <fixed-bar>
    <template #title>
      <view class="flex flex-row w-full h-full items-center mx-3">
        <view class="text-lg">商品分类</view>
      </view>
    </template>
    <template #content>
      <view class="bg-white pt-4 pb-2">
        <view class="mx-3 relative">
          <view
            class="absolute top-0 pl-3 flex flex-row items-center justify-center h-full">
            <icon type="search" size="20" />
          </view>
          <input
            placeholder="点击搜索商品"
            placeholder-style="color: #bbbbbb; font-size:14px"
            type="text"
            class="rounded-full pl-10 h-7 bg-gray-100" />
        </view>
      </view>
      <view
        id="side-bar"
        class="h-screen w-[200rpx] bg-white border-t text-center border-gray-200">
        <view
          v-for="(pt, index) in productTypes"
          :key="index"
          :id="'pt-' + index"
          class="py-4">
          {{ pt.typeName }}
        </view>
      </view>
    </template>
  </fixed-bar>
  <view class="h10 w-64 mt-64 ml-64">
    <scroll-view
      class="whitespace-nowrap no-scrollbar"
      scroll-x="true"
      scroll-with-animation="false">
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
      <view>123</view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import FixedBar from '@/components/FixedBar/FixedBar.vue'
import { ProductType } from './entitty/types'

const productTypes: Ref<ProductType[]> = ref([
  {
    typeName: '手机',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  },
  {
    typeName: '饰品',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  },
  {
    typeName: '电器',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  },
  {
    typeName: '运动',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  },
  {
    typeName: '数码',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  },
  {
    typeName: '车品',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  },
  {
    typeName: '纸质类',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  },
  {
    typeName: '阀门',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  },
  {
    typeName: '花艺',
    subTypes: [
      {
        subTypeName: '魅族',
        url: ''
      },
      {
        subTypeName: 'OPPO',
        url: ''
      },
      {
        subTypeName: '华为',
        url: ''
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '中兴',
        url: ''
      }
    ]
  }
])
const mButton = uni.getMenuButtonBoundingClientRect()
const productTypesLeft = ref(0)
const productTypesTop = ref(mButton.bottom + 100)

const scrollTop = ref(0)
function scroll(e: any) {
  console.log('scrollTop', scrollTop, 'scroll', e)
}

onMounted(() => {
  uni
    .createSelectorQuery()
    .select('#side-bar')
    .boundingClientRect((data) => {
      console.log('data:', data)
    })
    .exec()
})
</script>

<style lang="scss" scoped></style>
