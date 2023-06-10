<template>
  <fixed-bar style="pointer-events: none">
    <template #title>
      <view class="flex flex-row w-full h-full items-center mx-3">
        <view class="text-lg">商品分类</view>
      </view>
    </template>
    <template #content>
      <view class="bg-white pt-[30rpx] pb-[20rpx]" style="pointer-events: auto">
        <view class="mx-3 relative">
          <view
            class="absolute top-0 pl-3 flex flex-row items-center justify-center h-full">
            <icon type="search" size="20" />
          </view>
          <input
            placeholder="点击搜索商品"
            confirm-type="search"
            placeholder-style="color: #bbbbbb; font-size:14px"
            type="text"
            class="rounded-full pl-10 h-[55rpx] bg-gray-100"
            @confirm="searchDo" />
        </view>
      </view>
      <view
        style="pointer-events: auto"
        id="side-bar"
        class="h-screen w-[200rpx] bg-white border-t text-center border-gray-200">
        <view
          v-for="(pt, index) in productTypes"
          :key="index"
          class="py-4 text-sm"
          @click="selectType(index)"
          :class="activeSideBar === index ? 'bg-gray-100 text-red-500' : ''">
          {{ pt.typeName }}
        </view>
      </view>
    </template>
  </fixed-bar>
  <view
    class="flex flex-col h-full w-[550rpx] ml-[200rpx] px-2 pt-4"
    :style="{ marginTop: productTypesTop + 'px' }">
    <view v-for="(pt, ptIndex) in productTypes" :key="ptIndex">
      <view class="type-label font-medium ml-3 mb-2">{{ pt.typeName }}</view>
      <view class="grid grid-cols-3 gap-1 py-5 mb-5 w-full rounded-lg bg-white">
        <view
          v-for="(subType, subIndex) in pt.subTypes"
          :key="subIndex"
          class="flex flex-col justify-center items-center w-full h-full space-y-1">
          <image
            @click.capture="jumpToProductList(subIndex, subType.subTypeName)"
            mode="aspectFit"
            class="w-full h-10 rounded-full"
            :src="subType.url"></image>
          <view class="text-center text-xs text-gray-500 font-black">
            {{ subType.subTypeName }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import FixedBar from '@/components/FixedBar/FixedBar.vue'
import { ProductType, TypeLabelTop } from './entitty/types'
import { IsOutOfUpperBounds, IsOutOfLowerBounds } from '@/utils/arrayUtils'

const productTypes: Ref<ProductType[]> = ref([
  {
    typeName: '手机',
    subTypes: [
      {
        subTypeName: '华为',
        url: 'https://jmy-pic.baidu.com/0/pic/159601fc7f1e8e39dc7b9e31dc613f5f.jpg'
      },
      {
        subTypeName: 'OPPO',
        url: 'https://img1.baidu.com/it/u=3942809987,1137302445&fm=253&fmt=auto&app=138&f=JPG?w=500&h=250'
      },
      {
        subTypeName: '中兴',
        url: 'https://img1.baidu.com/it/u=2367536783,1277561976&fm=253&fmt=auto&app=120&f=JPEG?w=1128&h=800'
      },
      {
        subTypeName: '小米',
        url: ''
      },
      {
        subTypeName: '魅族',
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
const windowWidth = uni.getSystemInfoSync().windowWidth
const mButton = uni.getMenuButtonBoundingClientRect()
const productTypesTop = ref(mButton.bottom + (105 * windowWidth) / 750)
const activeSideBar = ref(0)
const typeLabelTops: Ref<TypeLabelTop[]> = ref([])
const prevBounds: Ref<TypeLabelTop | undefined> = ref()
const nextBounds: Ref<TypeLabelTop | undefined> = ref()
const isScrolling = ref(false)

// 左右关联起来
onPageScroll((e) => {
  if (isScrolling.value) {
    return
  }
  const scrollTop = e.scrollTop
  const o = activeSideBar.value

  if (prevBounds.value && o > 0 && scrollTop < prevBounds.value.top) {
    activeSideBar.value = activeSideBar.value - 1
  }
  if (
    nextBounds.value &&
    o < typeLabelTops.value.length - 1 &&
    scrollTop > nextBounds.value.top
  ) {
    activeSideBar.value = activeSideBar.value + 1
  }

  if (o !== activeSideBar.value) {
    followPrevAndNextBounds()
  }
})

function followPrevAndNextBounds() {
  const currentBoundsIndex = activeSideBar.value
  if (!IsOutOfLowerBounds(currentBoundsIndex, typeLabelTops.value, 1)) {
    prevBounds.value = typeLabelTops.value[currentBoundsIndex - 1]
  } else {
    prevBounds.value = undefined
  }
  if (!IsOutOfUpperBounds(currentBoundsIndex, typeLabelTops.value, 1)) {
    nextBounds.value = typeLabelTops.value[currentBoundsIndex + 1]
  } else {
    nextBounds.value = undefined
  }
}

onMounted(() => {
  uni
    .createSelectorQuery()
    .selectAll('.type-label')
    .boundingClientRect((data: any) => {
      for (let i in data) {
        typeLabelTops.value.push({
          index: i,
          top: data[i].top - productTypesTop.value - 10
        })
      }
      if (typeLabelTops.value.length > 1) {
        nextBounds.value = typeLabelTops.value[1]
      }
    })
    .exec()
})

function selectType(index: number) {
  isScrolling.value = true
  activeSideBar.value = index
  uni.pageScrollTo({
    scrollTop: typeLabelTops.value[index].top,
    duration: 300,
    complete: () => {
      isScrolling.value = false
      followPrevAndNextBounds()
    }
  })
}

function searchDo() {
  uni.navigateTo({
    url: '/pages/product/product_list/product_list'
  })
}

function jumpToProductList(id: number, name: string) {
  console.log('jump', id, name)
  uni.navigateTo({
    url: `/pages/product/product_list/product_list?id=${id}&name=${name}`
  })
}
</script>

<style lang="scss" scoped></style>
